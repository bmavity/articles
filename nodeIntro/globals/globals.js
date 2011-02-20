require('./external');

var inThisFile = 'this file';

console.log(global.externalWithoutVar); // 'without var'
console.log(global.externalWithVar); // undefined
console.log(global.inThisFile); // undefined
console.log(inThisFile); // 'this file'
