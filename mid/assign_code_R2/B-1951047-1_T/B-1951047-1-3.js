const constants = require('fs').constants;
const fs = require('fs').promises;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);


fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK)
.then(() => {
    console.log(`\n${folderName} folder already exist.\n`);
})
.catch((err) => {
    if (err.code === 'ENOENT'){
        console.log(`\nINFO : ${folderName} folder not exist.`);
    }
    fs.mkdir(`./${folderName}`)
    .then(() => {
        console.log(`\nINFO : ${folderName} folder created.\nPATH : ${__dirname}/${folderName}\n`);
    })
    .catch((err) => {
        throw err;
    });
})
.then(() => {
    fs.open(`./${folderName + path.sep + filename1}`, 'w')
    .then((data) => {
        console.log(`${folderName + path.sep + filename1} file (${data.fd}) is available.\n`);
    })
    .catch(err => {
        throw err;
    });
})
.then(() => {
    fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`)
    .then(() => {
        console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);
    })
    .catch(err => {
        throw err;
    });
})
.then(() => {
    fs.writeFile(`./${folderName + path.sep + filename2}`, buffer)
    .then(() => {
        console.log(`${filename2} written.\n`);
    })
    .catch(err => {
        throw err;
    });
})
.then(() => {
    fs.readFile(`./${folderName + path.sep + filename2}`)
    .then(data => {
        console.log(`${filename2}: ${data.toString()}`);
    })
    .catch(err => {
        throw err;
    });
});
