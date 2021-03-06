/**
 * wf2-2-17.js
 * Promise : 실행은 바로 하되 결괏값은 나중에 (then, catch)로 받는 객체
 */

const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('Success');
  } else {
    reject('Fail');
  }
});
// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
    console.log(message); // resolve case
  })
  .catch((error) => {
    console.error(error); // reject case
  })
  .finally(() => {        // Default case
    console.log('Default');
  });
