/**
 * filename: A-0000000-1-0.js
 * 분반: A
 * 학번: 1771094
 * 이름: 박도현
 * 문제: 1-#
 * 
 # 문제 3. 비동기 함수와 promise 를 이용하여 문제 1 과 같은 결과가 실행될 수 있도록 구현하세요. (폴더/파일명: 분반-학번-1-3/분반-학번-1-3.js)
 */



 const fs = require('fs');
 const constants = require('fs').constants;
 const path = require('path');
 
 const folderName = 'homework1';
 const filename1 = 'work1.txt';
 const filename2 = 'homework1.txt';
 const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);
 
// 1. 현재의 경로 하위에 homework1 폴더가 있는지 확인합니다.
function checkExists(){
    return new Promise((res,rej)=>{
        // 1) 폴더가 존재한다면 다음 내용 출력
        fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK,(err)=>{
            if(err){
                // 2) 폴더가 존재하지 않으면 다음 내용 출력하고,
                if (err && err.code==='ENOENT'){
                    console.log(`${folderName} folder not exist.`);
                }
                //mkdir을 아예 Promise 메서드로 하나 만들어서 rej로 넣어버리자
                rej();
            }else{
                console.log(`${folderName} folder already exist.\n`);
                res();
            }
        });
    });
    //return new Promise구문 끝
}

function checkMkdir(){
    return new Promise((res,rej)=>{
        // 2-1) 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
        fs.mkdir(`./${folderName}`,(err)=>{
            if(err){
                console.log(`mkdir에서 에러발생\n${err}`);
            }else{
                console.log(`${folderName} folder created.\n`);
                res();
            }
        });
    })
}


function checkOpen(){
    return new Promise((res,rej)=>{
    // 2. 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
        fs.open(`./${folderName + path.sep + filename1}`, 'w',(err,fd)=>{
            if(err){
                console.log(`open에서 에러발생\n${err}`);
            }else{
                console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`);
            }
        });
        res();
    });
    //return new Promise구문 끝
}

function checkRename(){
    return new Promise((res,rej)=>{
    // 3. 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.
    // 역시나 rename에서 no such file or directory 발생
        fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`,(err)=>{
            if(err){
                console.log(`rename에서 에러발생\n${err}`);
            }else{
                console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);    
            }
        });
        res();
    });
    //return new Promise 구문 끝
}

function checkWriteFile(){
    return new Promise((res,rej)=>{
    
    // 4. homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.
        fs.writeFile(`./${folderName + path.sep + filename2}`, buffer,'utf-8',(err)=>{
            if(err){
                console.log(`writeFile에서 에러발생\n${err}`);
            }else{
                console.log(`${filename2} written.\n`);
            }
        });
        res();
    });
    //return new Promise 구문 끝
}

function checkReadFile(){
    return new Promise((res,rej)=>{
    
    // 5. homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.
        fs.readFile(`./${folderName + path.sep + filename2}`,'utf-8',(err,data)=>{
            if(err){
                console.log(`readFile에서 에러발생\n${err}`);
            }else{
                console.log(`${filename2}: ${data.toString()}`);
            }
        });
        res();
    });
    //return new Promise 구문 끝
}


checkExists()
.catch(checkMkdir)
.then(checkOpen)
.then(checkRename)
.then(checkWriteFile)
.then(checkReadFile)