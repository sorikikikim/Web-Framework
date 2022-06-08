/**
 * 3.6/pipe.js
 */
const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('./result/writeme3.txt');
readStream.pipe(writeStream);
