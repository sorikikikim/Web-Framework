const fs = require('fs').promises;

fs.writeFile('./result/writeme.txt', '글이 입력됩니다')
  .then(() => {
    return fs.readFile('./result/writeme.txt');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
