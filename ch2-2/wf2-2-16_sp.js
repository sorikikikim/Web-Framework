/**
 * wf2-2-16_sp.js
 */

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

const { getCandy_sub, getCandy_origin, status: { count } } = candyMachine;

console.log(candyMachine.getCandy_origin());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_sub());
console.log(candyMachine.getCandy_origin());


console.log(count);
console.log(candyMachine.getCandy_origin());
