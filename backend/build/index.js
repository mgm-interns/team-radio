'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const https = require('https');

const callback = (err, ip) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(err);
  }
  // eslint-disable-next-line no-console
  console.log('Our public IP is', ip);
  return ip;
};

https.get({
  host: 'api.ipify.org'
}, response => {
  let ip = '';
  response.on('data', d => {
    ip += d;
  });
  response.on('end', () => {
    if (ip) {
      callback(null, ip);
    } else {
      callback('could not get public ip address :(');
    }
  });
});
_server2.default.start();