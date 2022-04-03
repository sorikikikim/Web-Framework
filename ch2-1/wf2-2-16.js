/**
 * wf2-2-16.js
 */

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
