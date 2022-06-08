/**
 * filename: N-1891179-1-3.js
 * 분반: N
 * 학번: 1891179
 * 이름: 김현학
 * 문제: 1-3
 * > 비동기 함수와 promise 를 이용하여 문제 1 과 같은 결과가 실행될 수 있도록 구현하세요.
 */
 
 /*
  * Notice
  *
  * #1
  * 1-2번 문제의 수정 사항을 반영하였습니다.
  * 
  * #2
  * path.join을 사용하여
  * filePath1, filePath2 변수 생성
  * 
  * #3
  * 예외처리 조건이 명시되지 않은 기타 비동기 함수 호출 간 발생한 오류는
  * throw err로 일괄 처리했습니다.
 */

const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const folderPath = path.join(__dirname, folderName)
const filename1 = 'work1.txt';
const filePath1 = path.join(folderPath, filename1)
const filename2 = 'homework1.txt';
const filePath2 = path.join(folderPath, filename2)
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);


const myAccessFolder = (dir, folderName, mode) => new Promise((resolve, reject) => { 
    fs.access(path.join(dir, folderName), mode, (err) => {
        err ? reject(err) : resolve(console.log(`${folderName} folder already exist.\n`))
    })
})

const myMakeFolder = (dir, folderName, mode) => new Promise((resolve, reject) => { 
    fs.mkdir(path.join(dir, folderName), mode, (err) => {
        err ? reject(err) : resolve(console.log(`${folderName} folder created.\n`))
    })
})

const myOpenFile = (dir, fileName, mode) => new Promise((resolve, reject) => { 
    fs.open(path.join(dir, fileName), mode, (err, fd) => {
        err ? reject(err) : resolve(console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`))
    })
})

const myRenameFile = (path1, path2) => new Promise((resolve, reject) => { 
    fs.rename(path1, path2, (err) => {
        err ? reject(err) : resolve(console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`))
    })
})

const myWriteFile = (path, buffer) => new Promise((resolve, reject) => { 
    fs.writeFile(path, buffer, (err) => {
        err ? reject(err) : resolve(console.log(`${filename2} written.\n`))
    })
})

const myReadFile = (path) => new Promise((resolve, reject) => { 
    fs.readFile(path, (err, data) => {
        err ? reject(err) : resolve(console.log(`${filename2}: ${data.toString()}`))
    })
})


myAccessFolder(__dirname, folderName, constants.F_OK | constants.W_OK | constants.R_OK)
    .catch(err => {
        if (err.code === 'ENOENT') {
            console.log(`${folderName} folder not exist.`)
            return myMakeFolder(__dirname, folderName, true).catch(err => {throw err})
        }
        else throw err
    })
    .then( () => { return myOpenFile(folderPath, filename1, 'w').catch(err => {throw err}) } )
    .then( () => { return myRenameFile(filePath1, filePath2).catch(err => {throw err}) } ) 
    .then( () => { return myWriteFile(filePath2, buffer).catch(err => {throw err}) } ) 
    .then( () => { return myReadFile(filePath2).catch(err => {throw err}) } )


 // 결과: 두 가지 경우 모두 1-2와 동일
