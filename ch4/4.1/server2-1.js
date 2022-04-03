/**
 * 4.1/server2-1.js
 */

const http = require('http');
const fs = require('fs').promises;

http.createServer((req, res) => {
  fs.readFile('./server2.html')
    .then((data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    })
    .catch ((err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    })
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });