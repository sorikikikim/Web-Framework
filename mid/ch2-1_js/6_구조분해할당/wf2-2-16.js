/**
 * wf2-2-16.js
 */

//객체 안의 속성을 변수명으로 사용
const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};

const { getCandy, status: { count } } = candyMachine;

console.log(candyMachine.getCandy());
console.log(getCandy());
console.log(count);
