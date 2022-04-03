/* wf2-2-1.js */
// var case

//var 사용시 변수의 호이스팅 발생
var var_i1;
console.log(var_i1);

var var_i2 = 10;
console.log(var_i2);
var_i2 = 20;
console.log(var_i2);
var var_i2 = 30;
console.log(var_i2);

var_i3 = 40;
var var_i3 = 50;
console.log(var_i3);

if (true) {
  var var_i4 = 60;
}
console.log(var_i4);