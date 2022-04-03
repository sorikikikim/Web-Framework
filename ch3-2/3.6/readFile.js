/**
 * 3.6/readFile.js
 */

const fs = require('fs');

fs.readFile('./readme_node.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});