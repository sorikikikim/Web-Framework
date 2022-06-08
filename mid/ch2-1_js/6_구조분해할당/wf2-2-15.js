/**
 * wf2-2-15.js
 * 변수에 객체의 속성 할당하는 기존의 방법
 */

var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status.count;
  },
};

var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
