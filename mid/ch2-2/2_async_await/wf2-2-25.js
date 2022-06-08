/**
 * wf2-2-25.js
 * for await of 
 * 
 * resolve된 promise가 변수에 담겨나옴
 * await을 사용하기 때문에 async 함수 안에서 사용
 */

const promise1 = Promise.resolve('Success1');
const promise2 = Promise.resolve('Success2');
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
