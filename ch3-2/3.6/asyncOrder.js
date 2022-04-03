/** 
 * 3.6/asyncOrder.js
 */

const fs = require('fs');

console.log('start:');
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('#1', data.toString());
  fs.readFile('./readme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('#2', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
      if (err) {
        throw err;
      }
      console.log('#3', data.toString());
      console.log('end:');
    });
  });
});
