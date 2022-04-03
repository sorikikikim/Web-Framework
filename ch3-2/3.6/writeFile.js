/**
 * 3.6/writeFile.js
 */

const fs = require('fs');

fs.writeFile('./result/writeme.txt', 'text here', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('./result/writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.toString());
  });
});
