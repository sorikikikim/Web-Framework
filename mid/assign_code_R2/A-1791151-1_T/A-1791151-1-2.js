/**
 * filename: A-1791151-1-2.js
 * 분반: A
 * 학번: 1791151
 * 이름: 김선도
 * 문제: 1-2
 */

const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);


const func = () => {
    // 2. 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
    fs.open(`./${folderName + path.sep + filename1}`, 'w', (err, fileId) => {
        if (err) {
            console.log(`failed creating to ${filename1}`);
            throw err;
        }
        console.log(`${folderName + path.sep + filename1} file (${fileId}) is available.\n`);

        // 3. 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.
        fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`, err => {
            if (err) {
                console.log(`failed renaming from ${filename1} to ${filename2}}`);
                throw err;
            }
            console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);

            // 4. homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.
            fs.writeFile(`./${folderName + path.sep + filename2}`, buffer, err => {
                if (err) {
                    console.log(`failed writing to ${filename1}`);
                    throw err;
                }
                console.log(`${filename2} written.\n`);

                // 5. homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.
                fs.readFile(`./${folderName + path.sep + filename2}`, (error, data) => {
                    if (err) {
                        console.log(`failed reading ${filename1}`);
                        throw err;
                    }
                    console.log(`${filename2}: ${data.toString()}`);
                });
            });
        });
    });
}

// 1. 현재의 경로 하위에 homework1 폴더가 있는지 확인합니다.
fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK, err => {
    if (!err) {
        // 1) 폴더가 존재한다면 다음 내용 출력
        console.log(`${folderName} folder already exist.\n`);

        func();
    } else {
        // 2) 폴더가 존재하지 않으면 다음 내용 출력하고,
        if (err.code === 'ENOENT') {
            console.log(`${folderName} folder not exist.`);
        }
        // 2-1) 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
        fs.mkdir(`./${folderName}`, () => {
            console.log(`${folderName} folder created.\n`);

            func();
        });
    }
});