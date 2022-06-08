/**
 * filename: A-0000000-1-0.js
 * 분반: A
 * 학번: 1771094
 * 이름: 박도현
 * 문제: 1-#
 * 
 *# 문제2. 비동기 함수와 중첩된 callback을 이용하여 문제1과 같은 결과가 실행될 수 있도록 구현하세요. (폴더/파일명: 분반-학번-1-2/분반-학번-1-2.js)
*/



const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);

// 1. 현재의 경로 하위에 homework1 폴더가 있는지 확인합니다.
// 1) 폴더가 존재한다면 다음 내용 출력
fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK,(err)=>{
    if (err && err.code === 'ENOENT'){
        // 2) 폴더가 존재하지 않으면 다음 내용 출력하고,
        console.log(`${folderName} folder not exist.`);
        // 2-1) 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
        fs.mkdir(`./${folderName}`,(err)=>{
            if(err){
                console.log(`mkdir에서 에러발생\n${err}`);
            }else{
                console.log(`${folderName} folder created.\n`);

                doWhenFolderExist();

            }
        });
    }
    else{
        console.log(`${folderName} folder already exist.\n`);

        doWhenFolderExist();
    }
});
//access 끝





function doWhenFolderExist(){
    // 2. 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
    fs.open(`./${folderName + path.sep + filename1}`, 'w',(err,fd)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`);
            // 3. 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.
            // open보다 rename 이 먼저 실행될 경우 no such file or directory 에러 간간히 발생 이 사정은 컴퓨터마다 다를듯함
            fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`,(err)=>{
                if(err){
                    console.log(`rename에서 에러발생\n${err}`);
                }else{
                    console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
                    
                    // 4. homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.
                    fs.writeFile(`./${folderName + path.sep + filename2}`, buffer,'utf-8',(err)=>{
                        if(err){
                            console.log(`writeFile에서 에러발생\n${err}`);
                        }else{
                            console.log(`${filename2} written.\n`);

                            // 5. homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.
                            fs.readFile(`./${folderName + path.sep + filename2}`,'utf-8',(err,data)=>{
                                if(err){
                                    console.log(`readFile에서 에러발생\n${err}`);
                                }else{
                                    console.log(`${filename2}: ${data.toString()}`);
                                }
                            });
                            //fs.readFile 끝
                        }
                    });
                    //fs.writeFile 끝
                }
            });
            //fs.rename 끝
        }
    });
}







