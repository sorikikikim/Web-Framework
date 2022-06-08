/**
 * 3.6/copyFile.js
 */

const fs = require('fs');

fs.copyFile('readme4.txt', './result/writeme4.txt', (error) => {
  if (error) {
    return console.error(error);
  }
  console.log('복사 완료');
});
