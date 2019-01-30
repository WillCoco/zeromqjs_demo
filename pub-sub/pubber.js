// pubber.js
var zmq = require('zeromq')
  , sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Publisher bound to port 3000');

let msgId = 0;
setInterval(function(){
  msgId++;
  console.log('sending a multipart message envelope', msgId);
  sock.send(['kitty cats', 'meow!'+msgId]);
}, 500);
