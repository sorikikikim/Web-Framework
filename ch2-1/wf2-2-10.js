/** 
 * wf2-2-10.js
 */

//기존함수 
function func_a(x, y) {
  return x + y;
};
console.log(`func_a: ${func_a(1, 2)}`);  // 3

//함수를 객체로 변환하여 사용할때 아래와 같이 익명함수 사용
//function 부분을 화살표 함수로 변환 가능 
const func_b = function(x, y) {
  return x + y;
};
console.log(`func_b: ${func_b(1, 2)}`); // 3