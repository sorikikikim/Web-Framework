/** 
 * 3.6/sync.js
 */

const fs = require('fs');

console.log('start:');
let data = fs.readFileSync('./readme.txt');
console.log('#1', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('#2', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('#3', data.toString());
console.log('end:');
