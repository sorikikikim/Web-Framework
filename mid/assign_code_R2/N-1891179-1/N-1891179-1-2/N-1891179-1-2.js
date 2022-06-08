/**
 * filename: N-1891179-1-2.js
 * 분반: N
 * 학번: 1891179
 * 이름: 김현학
 * 문제: 1-2
 * > 비동기 함수와 중첩된 callback 을 이용하여 문제 1 과 같은 결과가 실행될 수 있도록 구현하세요
 */
 
 /*
  * Notice
  *
  * #1
  * 1-1번 문제의 수정 사항을 반영하였습니다.
  * 
  * #2
  * 비동기 함수 호출 간 오류가 발생하지 않은 경우,
  * 콜백 함수에서 null 값이 담긴 err 변수를 참조하며 오류가 발생합니다.
  * 따라서, 콜백 함수에서의 오류 처리 조건문을 수정하여
  * 전달된 인자가 null이 아닌 경우에만 참조하도록 수정했습니다.
  * 
  * #3
  * 예외처리 조건이 명시되지 않은 기타 비동기 함수 호출 간 발생한 오류는
  * console.error(err.message)로 일괄 처리했습니다.
 */
 
 const fs = require('fs');
 const constants = require('fs').constants;
 const path = require('path');
 
 const folderName = 'homework1';
 const folderPath = `${__dirname + path.sep + folderName}`
 const filename1 = 'work1.txt';
 const filename2 = 'homework1.txt';
 const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);

 fs.access(folderPath, constants.F_OK | constants.W_OK | constants.R_OK, (err) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log(`${folderName} folder not exist.`)

            fs.mkdir(folderPath, (err) => {
                if (err) console.error(err.message)
                else console.log(`${folderName} folder created.\n`)
            })
        }
        else console.error(err.message)
    }
    else console.log(`${folderName} folder already exist.\n`)

    fs.open(`${folderPath + path.sep + filename1}`, 'w', (err, fd) => {
        if (err) console.error(err.message)
        else console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`)

        fs.rename(`${folderPath + path.sep + filename1}`, `${folderPath + path.sep + filename2}`, (err) => {
            if (err) console.error(err.message)
            else console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`)

            fs.writeFile(`${folderPath + path.sep + filename2}`, buffer, (err) => {
                if (err) console.error(err.message)
                else console.log(`${filename2} written.\n`)

                fs.readFile(`${folderPath + path.sep + filename2}`, (err, data) => {
                    if (err) console.error(err.message)
                    else console.log(`${filename2}: ${data.toString()}`)
                })
            })
        })
    })
 })


 // 결과: 두 가지 경우 모두 1-1과 동일
