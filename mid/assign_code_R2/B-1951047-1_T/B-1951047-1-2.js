const fs = require('fs');
const constants = require('fs').constants;
const path = require('path');

const folderName = 'homework1';
const filename1 = 'work1.txt';
const filename2 = 'homework1.txt';
const buffer = Buffer.from([0x47, 0x6f, 0x6f, 0x64, 0x20, 0x6a, 0x6f, 0x62, 0x21]);

fs.access(`./${folderName}`, constants.F_OK | constants.W_OK | constants.R_OK, (err) => {
    if(err) {
        if (err.code === 'ENOENT'){
            console.log(`\n${folderName} folder not exist.`);
    
            fs.mkdir(`./${folderName}`, () => {
                console.log(`\n${folderName} folder created.\nPATH : ${__dirname}/${folderName}`);
                
                fs.open(`./${folderName + path.sep + filename1}`, 'w', (err, data) => {
                    console.log(`${folderName + path.sep + filename1} file (${data}) is available.\n`);

                    fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`, () => {
                        console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);

                        fs.writeFile(`./${folderName + path.sep + filename2}`, buffer, () => {
                            console.log(`${filename2} written.\n`);

                            fs.readFile(`./${folderName + path.sep + filename2}`, (err, data) => {
                                if(err) {
                                    throw err;
                                }
                                console.log(`${filename2}: ${data.toString()}`);
                            });
                        });
                    });
                });
            });
        }
    }
    else {
        console.log(`\n${folderName} folder already exist.\n`);

        fs.open(`./${folderName + path.sep + filename1}`, 'w', (err, data) => {
            console.log(`${folderName + path.sep + filename1} file (${data}) is available.\n`);

            fs.rename(`./${folderName + path.sep + filename1}`, `./${folderName + path.sep + filename2}`, () => {
                console.log(`${filename1} was changed to ${filename2} at .${path.sep + folderName}\n`);

                fs.writeFile(`./${folderName + path.sep + filename2}`, buffer, () => {
                    console.log(`${filename2} written.\n`);

                    fs.readFile(`./${folderName + path.sep + filename2}`, (err, data) => {
                        if(err) {
                            throw err;
                        }
                        console.log(`${filename2}: ${data.toString()}`);
                    });
                });
            });
        });
    }
});