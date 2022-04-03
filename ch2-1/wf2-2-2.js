/* wf2-2-2.js */
// let case

//변수 호이스팅 방지 
//1. let 사용
let let_i1;
console.log(let_i1);

let let_i2 = 10;
console.log(let_i2);
let_i2 = 20;
console.log(let_i2);
let let_i2 = 30;
console.log(let_i2);

let_i3 = 40;
let let_i3 = 50;
console.log(let_i3);

if (true) {
  let let_i4 = 60;
}
console.log(let_i4);

function func1(x, y) {
  return x + y;
}
