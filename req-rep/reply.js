var zmq = require('zeromq');
var rep = zmq.socket('rep');

rep.on('message', function(duration){
  console.log('rep接收到请求:'+duration)
  setTimeout(() => {
    console.log('rep回复:'+duration)
    rep.send('rep:'+duration);
  }, duration)
});

rep.bind('tcp://127.0.0.1:8087', function (error) {
  if (error) console.error(error);;
  console.log('server ready!')
})
