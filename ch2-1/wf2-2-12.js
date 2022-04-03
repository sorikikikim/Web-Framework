/** 
 * wf2-2-12.js
 */

// 화살표 함수 기본형
const func1 = (x, y) => {
  return x + y;
}
console.log(`func1: ${func1(2, 3)}`);  // 5

// 1. 한 줄짜리 return 구문만 존재하는 함수는 return 생략
const func2 = (x, y) => (x + y);
console.log(`func2: ${func2(2, 3)}`); // 5

// 2-1. 매개변수가 없는 경우
const func3 = () => {
  console.log('func3: no param');
}
func3();

// 2-2. 1줄짜리 함수는 {} 도 생략
const func4 = () => console.log('func4: no param');
func4();

// 3-1. 매개변수가 1개 이면, ()도 생략
const func5 = x => {
  return x*2;
}
console.log(`func5: ${func5(4)}`); // 8

// 3-2. 1줄의 return 만 존재하는 함수는 {}과 return 생략
const func6 = x => x*2;
console.log(`func6: ${func6(4)}`); // 8
