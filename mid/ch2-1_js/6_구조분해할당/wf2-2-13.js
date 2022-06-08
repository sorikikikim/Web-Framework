/**
 * wf2-2-13.js
 * 구조분해할당 : 객체나 배열로부터 
 * 속성을 가져와 변수에 할당
 */

var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

console.log(array);
console.log(node);
console.log(obj);
console.log(bool);