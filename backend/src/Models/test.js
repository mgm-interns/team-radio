var respone = require('./ResponeModel');
var data = {
  name: 'abc',
  babe: 'cde',
};
var error = {
  name: 'error',
  babe: '123',
};
console.log(respone('a', data, error));
