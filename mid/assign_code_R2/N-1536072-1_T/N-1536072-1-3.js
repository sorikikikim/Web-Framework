/**
 * filename: N-1536072-1-4.js
 * 분반: N
 * 학번: 1536072
 * 이름: 장동율
 * 문제: 1-3
 */

 const fs = require('fs').promises;
 const constants = require('fs').constants;
 const path = require('path');
 
 const folderName = 'homework1';
 const filename1 = 'work1.txt';
 const filename2 = 'homework1.txt';
 const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);
 
 let dirpath = __dirname;
 let filepath = __filename;

console.log("1번 문제")
fs.access(`.\\${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK)
.then((data)=>{
    console.log(`${folderName} folder already exist.\n`);
    a();
})
.catch((err)=>{
    if (err.code==='ENOENT')
    {// 폴더가 존재하지 않으면 다음 내용 출력하고,
        console.log(`${folderName} folder not exist.`);
    }
    fs.mkdir(`.\\${folderName}`)// 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
    .then((data)=>{
        console.log(`${folderName} folder created.\n`);
        console.log("전체 경로를 아래에 출력하겠습니다");
        console.log(`${dirpath}\\${folderName}`);
        a();
    })
    .catch((err)=>{
        console.log(err);
    })   
})


function a()
{
    return fs.open(`.\\${folderName + path.sep + filename1}`, 'w')
    .then((result)=>{
        console.log(`\n2번 문제: 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.`);
        console.log(`${folderName + path.sep + filename1} file (${result.fd}) is available.\n`);
        return  fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`)
    })
    .then(()=>{
        console.log(`\n3번 문제: 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.`);
        console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
        //resolve('Success'); 
        return fs.writeFile(`./${folderName + path.sep + filename2}`, buffer)
    })
    .then(()=>{
        console.log(`\n4번 문제: homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.`);
        console.log(`${filename2} written.\n`);
        //resolve('Success'); 
        return fs.readFile(`./${folderName + path.sep + filename2}`)
    })
    .then((data)=>{
        console.log(`\n5번 문제: homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.`);
        console.log(`${filename2}: ${data.toString()}`);
        //resolve('Success'); 
    })
    .catch((err)=>{
        console.log(err);
    })
}
