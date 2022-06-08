/**
 * 3.3/func.js
 * 파일 끝에 module.exports로 모듈로 만들 값 지정
 */

//require에 필요한 파일이름
//module 실행 시 node index로 실행
const { odd, even } = require('./var');

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
