const constants = require('fs').constants;
const fs = require('fs').promises;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);

async function assignment() {
    try {
        await fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK);
        console.log(`${folderName} folder already exist.\n`);
    }
    catch (err) {
        if (err.code==='ENOENT'){
            console.log(`${folderName} folder not exist.`);
        }
        try {
            await fs.mkdir(`./${folderName}`);
            console.log(`${folderName} folder created.\nPATH : ${__dirname}/${folderName}`);
        }
        catch (err) {
            throw err;
        }
    }

    try {
        const fileId = fs.open(`./${folderName + path.sep + filename1}`, 'w');
        console.log(`${folderName + path.sep + filename1} file (${(await fileId).fd}) is available.\n`);
    }
    catch (err) {
        throw err;
    }

    try {
        fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`);
        console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
    }
    catch (err) {
        throw err;
    }

    try {
        fs.writeFile(`./${folderName + path.sep + filename2}`, buffer);
        console.log(`${filename2} written.\n`);
    }
    catch (err) {
        throw err;
    }

    try {
        const data = fs.readFile(`./${folderName + path.sep + filename2}`);
        console.log(`${filename2}: ${(await data).toString()}`);
    }
    catch (err) {
        throw err;
    }
}

assignment();