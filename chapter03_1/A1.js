const A = 'variable A from A1.js';
const B = require('./B1');;

console.log(B + ' in A1.js');

module.exports = A;