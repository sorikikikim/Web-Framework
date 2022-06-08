/**
 * wf2-2-16_sp.js
 */

//객체 안의 속성을 변수명으로 사용
const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy_sub() {
    this.status.count--;
    return this.status.count;
  },
  getCandy_origin() {
    return this.status.count;
  },
};

//candyMachine 객체의 속성을 탐색
const { getCandy_sub, getCandy_origin, status: { count } } = candyMachine;

console.log(candyMachine.getCandy_origin());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_origin());


console.log(count);
console.log(candyMachine.getCandy_origin());
