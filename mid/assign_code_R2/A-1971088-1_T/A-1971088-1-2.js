/**
 * filename: A-1971088-1-2.js
 * 분반: A
 * 학번: 1971088
 * 이름: 주권영
 * 문제: 1-2
 */

const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);


function aboutFile() {
    //파일생성
    const fileId = fs.open(`./${folderName + path.sep + filename1}`, 'w', (err, fileId) => {
        if(err){throw err;}
        console.log(`${folderName + path.sep + filename1} file (${fileId}) is available.\n`);
        //파일 이름변경
        fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`, (err)=> {
            if(err){throw err;}
            console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
            //파일에 버퍼내용 쓰기
            fs.writeFile(`./${folderName + path.sep + filename2}`, buffer, (err) => {
                if(err){throw err;}
                console.log(`${filename2} written.\n`);
                //파일 출력
                const data = fs.readFile(`./${folderName + path.sep + filename2}`, (err, data) => {
                    if(err){throw err;}
                    console.log(`${filename2}: ${data.toString()}`);
                });
            });
        });
    });
}


fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK, (err) => {
    if(err) {
        console.log(`${folderName} folder not exist.`);
        fs.mkdir(`./${folderName}`, (err) => {
            if(err) {throw err;}
            console.log(`${folderName} folder created.\n`);
            aboutFile();
        });
    }else{
        console.log(`${folderName} folder already exist.\n`);
        aboutFile();
    }
});