/* wf2-2-3.js */
// const case

//변수 호이스팅 방지 
//2. const 사용
const const_i1;
console.log(const_i1);

const const_i2 = 10;
console.log(const_i2);
const_i2 = 20;
console.log(const_i2);
const const_i2 = 30;
console.log(const_i2);

const_i3 = 40;
const const_i3 = 50;
console.log(const_i3);

if (true) {
    const const_i4 = 60;
}
console.log(const_i4);