var zmq = require('zeromq');
var req = zmq.socket('req');

req.connect('tcp://127.0.0.1:8087', function(err){
  console.log(err, '连接失败')
});

var amouns = [6000, 1000];
amouns.map(function(duration, i) {
  console.log(duration, 'duration')
  req.send(duration);
})

req.on('message', function(msg){
  console.log(msg.toString(), '收到消息')
});

req.on('error', function(msg){
  console.log(msg.toString(), 'error')
});
