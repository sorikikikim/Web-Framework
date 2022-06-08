/** 
 * wf2-2-9.js
 */

//함수 호이스팅 방지 : const, let으로 함수를 변수나 상수로 할당

//add2, add3가 const로 선언되어 호출 불가능
console.log(add2(10, 20));  // Uncaught ReferenceError
console.log(add3(10, 20));  // Uncaught ReferenceError

// 함수 표현식 1: 익명함수 활용
const add2 = function(x, y){
  return x + y;
}

// 함수 표현식 2: 기명함수 – 함수 식별자 존재
//기명함수의 경우 add4와 같이 본인 내부에서만 호출하는 재귀함수로서의 
//사용은 가능하지만 외부에서는 사용이 불가능
const add3 = function add4(x, y){
  return x + y;
}

console.log(add2(10, 20));  // 30
console.log(add3(10, 20));  // 30
//기명함수 add4는 사용 불가능
console.log(add4(10, 20));  // Uncaught ReferenceError