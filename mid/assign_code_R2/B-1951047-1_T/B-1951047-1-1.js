const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);

try {
    fs.accessSync(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK);
    console.log(`${folderName} folder already exist.\n`);
} catch (err) {
    if (err.code==='ENOENT'){
        console.log(`${folderName} folder not exist.`);
    }
    fs.mkdirSync(`./${folderName}`, () => {});
    console.log(`${folderName} folder created.\n`);
    console.log(`PATH : ${__dirname}/${folderName}`);
}

const fileId = fs.openSync(`./${folderName + path.sep + filename1}`, 'w');
console.log(`${folderName + path.sep + filename1} file (${fileId}) is available.\n`);

fs.renameSync(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`);
console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);

fs.writeFileSync(`./${folderName + path.sep + filename2}`, buffer);
console.log(`${filename2} written.\n`);

const data = fs.readFileSync(`./${folderName + path.sep + filename2}`);
console.log(`${filename2}: ${data.toString()}`);