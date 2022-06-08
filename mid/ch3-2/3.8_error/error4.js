/**
 * 3.8/error4.js
 */

//에러를 처리하는 과정
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});
//=> 처리하지 않으면 프로세스가 에러 객체 생성 후 종료됨

//에러를 던지고
setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);
