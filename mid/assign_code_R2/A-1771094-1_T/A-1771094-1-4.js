/**
 * filename: A-0000000-1-0.js
 * 분반: A
 * 학번: 1771094
 * 이름: 박도현
 * 문제: 1-#
 * 
 *# 문제 4. 비동기 함수와 async – await 구문을 이용하여 문제 1 과 같은 결과가 실행될 수 있도록 구현하세요. (폴더/파일명: 분반-학번-1-4/분반-학번-1-4.js)
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
    //Promise 구문 시작
    return new Promise((res,rej)=>{
        // 1) 폴더가 존재한다면 다음 내용 출력
        fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK,(err)=>{
            if(err){
                // 2) 폴더가 존재하지 않으면 다음 내용 출력하고,
                if (err && err.code==='ENOENT'){
                    console.log(`${folderName} folder not exist.`);
                }
                rej("exists start");
            }else{
                console.log(`${folderName} folder already exist.\n`);
                res("exists start");
            }
        });
    });
    //Promise 구문 끝
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


// 2. 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
function checkOpen(){
    //Promise 구문 시작
    return new Promise((res,rej)=>{
        fs.open(`./${folderName + path.sep + filename1}`, 'w',(err,fd)=>{
            if(err){
                console.log(`open에서 에러발생\n${err}`);
            }else{
                console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`);
            }
        });
        res("open start");
    });
    //Promise 구문 끝
}
 
// 3. 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.
function checkRename(){
    //promise 구문 시작
    return new Promise((res,rej)=>{
        fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`,(err)=>{
            if(err){
                console.log(`rename에서 에러발생\n${err}`)
            }else{
                console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);    
            }
        });
        res("rename start");
    });
    //promise 구문 끝
}
 
 
// 4. homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.
function checkWriteFile(){
    //Promise 구문 시작
    return new Promise((res,rej)=>{
        fs.writeFile(`./${folderName + path.sep + filename2}`, buffer,'utf-8',(err)=>{
            if(err){
                console.log(`writeFile에서 에러발생\n${err}`);
            }else{
                console.log(`${filename2} written.\n`);
            }
        });
        res("writeFile start");
    });
    //Promise 구문 끝
}


// 5. homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.
function checkReadFile(){
    //Promise 구문 시작
    return new Promise((res,rej)=>{
        fs.readFile(`./${folderName + path.sep + filename2}`,'utf-8',(err,data)=>{
            if(err){
                console.log(`readFile에서 에러발생\n${err}`);
            }else{
                console.log(`${filename2}: ${data.toString()}`);
            }
        });
        res(`readFile start`);
    });
    //Promise 구문 끝
}
 


const start = async ()=>{
    try{
        let exists = await checkExists();
    }catch(e){
        await checkMkdir();
    }
    let open = await checkOpen();
    
    let rename = await checkRename();
    
    let writeFile = await checkWriteFile();
    
    let readFile = await checkReadFile();
}

start();