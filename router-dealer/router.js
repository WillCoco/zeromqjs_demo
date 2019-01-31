// 不阻塞的方式req/rep
// 需要指定身份
// n对m 可以利用cluster集群功能

var zmq = require('zeromq');
var backEnd = zmq.socket('router');

let backEndArrd = 'tcp://127.0.0.1:8088';

backEnd.on('message', function(id, params){
  const { requestId, data } = JSON.parse(params.toString());
  const clientId = id.toString();
  console.log(id.toString())
  console.log(data, requestId, clientId,111111)

  console.log('rep接收到请求:', clientId, requestId, data)

  setTimeout(() => {
    console.log('rep回复:'+clientId+'-'+data.duration+'-'+requestId)
    backEnd.send([clientId, params]);
  }, data.duration || 1000)
});

backEnd.bind(backEndArrd, function (error) {
  if (error) console.error(error);;
  console.log('server ready!')
})
