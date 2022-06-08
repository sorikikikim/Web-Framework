/** 
 * 3.6/gzip.js
 */

const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./result/readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);