// 不阻塞的方式req/rep
// 需要指定身份
// n对m 可以利用cluster集群功能

var zmq = require('zeromq');
var backEnd = zmq.socket('router');

let backEndArrd = 'tcp://127.0.0.1:8088';

backEnd.on('message', function(id, data){
  console.log('rep接收到请求:', id.toString(), data.toString())
  const duration = data.toString();
  setTimeout(() => {
    console.log('rep回复:'+data.toString()+'-'+id.toString())
    backEnd.send('rep:');
  }, duration)
});

backEnd.bind(backEndArrd, function (error) {
  if (error) console.error(error);;
  console.log('server ready!')
})
