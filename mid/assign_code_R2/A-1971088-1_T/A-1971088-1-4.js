/**
 * filename: A-1971088-1-4.js
 * 분반: A
 * 학번: 1971088
 * 이름: 주권영
 * 문제: 1-4
 */

const fs = require('fs');
const fsPromises = fs.promises;
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);


async function run(){
    try {
        await fsPromises.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK);
        console.log(`${folderName} folder already exist.\n`);
    } catch (err) {
        if (err.code==='ENOENT'){
            console.log(`${folderName} folder not exist.`);
        }
        await fsPromises.mkdir(`./${folderName}`);
        console.log(`${folderName} folder created.\n`);
    }

    try{
    const fileId = await fsPromises.open(`./${folderName + path.sep + filename1}`, 'w');
    console.log(`${folderName + path.sep + filename1} file (${fileId.fd}) is available.\n`);
    }
    catch (e){
        console.error(e);
    }

    try {
    await fsPromises.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`);
    console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
    }
    catch (e){
        console.error(e);
    }

    try {
    await fsPromises.writeFile(`./${folderName + path.sep + filename2}`, buffer);
    console.log(`${filename2} written.\n`);
    }
    catch (e){
        console.error(e);
    }

    try {
    const data = await fsPromises.readFile(`./${folderName + path.sep + filename2}`);
    console.log(`${filename2}: ${data.toString()}`);
    }
    catch (e){
        console.error(e);
    }
}

run();