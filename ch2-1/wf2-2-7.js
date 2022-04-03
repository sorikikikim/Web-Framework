/**
 * wf2-2-7.js
 */ 

const sayNode = function() {
    console.log('Node');
};
const es = 'ES';
const newObject = {
  sayJS() {
    console.log('JS');
  },
  sayNode,
  [es + 6]: 'Fantastic',
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);  