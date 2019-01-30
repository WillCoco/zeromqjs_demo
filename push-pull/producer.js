// 生产者开始工作后分发消息。
// 工作流水线，每条消息只能流向一个worker去处理
// 分流，分布式，分发任务


var zmq = require('zeromq')
  , sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:3000', function (error) {
  if (error) console.error(error);;
  console.log('server ready!')
});

console.log('Producer bound to port 3000');
let msg = 0;
setInterval(function(){
  msg++;
  console.log('sending work'+msg);
  sock.send('some work'+msg);
}, 500);
