/**
 * filename: B-1971195-1-4.js
 * 분반: B
 * 학번: 1971195
 * 이름: 민경은
 * 문제: 1-4
 */

 const fs = require('fs').promises;
 const { resolve } = require('path');
 const constants = require('fs').constants;
 const path = require('path');
 
 const folderName = 'homework1';
 const filename1 = 'work1.txt';
 const filename2 = 'homework1.txt';
 const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);
 

 (async () => {
     try{
        // 1. 현재의 경로 하위에 homework1 폴더가 있는지 확인합니다.
        await fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK);
        // 1) 폴더가 존재한다면 다음 내용 출력
        console.log(`${folderName} folder already exist.\n`);
     } catch(err) {
        if (err.code==='ENOENT') {
            // 2) 폴더가 존재하지 않으면 다음 내용 출력하고,
            console.log(`${folderName} folder not exist.`);
            // 2-1) 쓰기 권한을 갖는 homework1 폴더를 생성하고 전체 경로를 출력합니다.
            await fs.mkdir(`./${folderName}`);
            console.log(`${folderName} folder created.\n`);
        }
    }

    // 2. 생성된 homework1 폴더에서 work1.txt 파일을 생성하고 파일의 아이디를 함께 출력합니다.
    const fd = await fs.open(`./${folderName + path.sep + filename1}`, 'w');
    console.log(`${folderName + path.sep + filename1} file (${fd.fd}) is available.\n`);

    // 3. 생성한 파일명 work1.txt을 homework1.txt로 변경하고, 결과를 출력합니다.
    await fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`);
    console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);

    // 4. homework1.txt 파일에 다음의 buffer의 내용을 기록하고 결과를 출력합니다.
    await fs.writeFile(`./${folderName + path.sep + filename2}`, buffer);
    console.log(`${filename2} written.\n`);

    // 5. homework1.txt 파일의 내용을 문자열로 화면에 출력합니다.
    const data = await fs.readFile(`./${folderName + path.sep + filename2}`);
    console.log(`${filename2}: ${data.toString()}`);
})()







 
 

 

 
 
   
 
     
 
 
