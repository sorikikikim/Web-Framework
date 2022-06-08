/**
 * filename: N-1536072-1-2.js
 * 분반: N
 * 학번: 1536072
 * 이름: 장동율
 * 문제: 1-2
 */

 const fs = require('fs');
 const constants = require('fs').constants;
 const path = require('path');
 
 const folderName = 'homework1';
 const filename1 = 'work1.txt';
 const filename2 = 'homework1.txt';
 const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);
 
 let dirpath = __dirname;
 let filepath = __filename;

function a()
{
  console.log(`\n2번 문제: 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.`)
  const fileId = fs.open(`.\\${folderName + path.sep + filename1}`, 'w', (err, fd)=>{
     if(err)
     { //실패한 경우
        throw err;
     }//성공한 경우
     console.log(`${folderName + path.sep + filename1} file (${fd}) is available.\n`);
     fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`,(err,data)=>{
         if(err) throw err;
         console.log(`\n3번 문제: 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.`)
         console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
         fs.writeFile(`./${folderName + path.sep + filename2}`, buffer, (err)=>{
             console.log(`\n4번 문제: homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.`);
             if(err)
             {
                 console.log(err);
             }
             console.log(`${filename2} written.\n`);
             fs.readFile(`./${folderName + path.sep + filename2}`,(err,data)=>{
                 if(err) throw err;
                 console.log(`\n5번 문제: homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.`);
                 console.log(`${filename2}: ${data.toString()}`);
             });
         });
     });
 });   
}

 //1번 문제
 console.log("1번 문제")
 fs.access(`.\\${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK, (err) => {
    if(err)
    {
        if (err.code==='ENOENT')
        {// 폴더가 존재하지 않으면 다음 내용 출력하고,
            console.log(`${folderName} folder not exist.`);
        }        
        fs.mkdir(`.\\${folderName}`,(err)=>{
             // 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
             if(err) throw err;//실패할 경우
             console.log(`${folderName} folder created.\n`);
             console.log("전체 경로를 아래에 출력하겠습니다");
             console.log(`${dirpath}\\${folderName}`);

            a();
        });
    }
    else
    {// 폴더가 존재한다면 다음 내용 출력
        console.log(`${folderName} folder already exist.\n`);    
        //2번 문제: 2번 문제: 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
       a(); 
    }
 });

