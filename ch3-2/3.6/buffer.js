/**
 * 3.6/buffer.js
 */

const buffer = Buffer.from('original text');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('space1,'), Buffer.from('space2,'), Buffer.from('space3')];
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
