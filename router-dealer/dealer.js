var zmq = require('zeromq');
var frontEnd = zmq.socket('dealer');

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomString() {
  var source = 'abcdefghijklmnopqrstuvwxyz'
    , target = [];

  for (var i = 0; i < 20; i++) {
    target.push(source[randomBetween(0, source.length)]);
  }
  return target.join('');
}

frontEnd.identity = randomString();
console.log(frontEnd.identity, '----')

frontEnd.connect('tcp://127.0.0.1:8088', function (error) {
  if (error) console.error(error);;
  console.log('client connect!')
})

var amouns = [6000, 1000];
amouns.map(function(duration, i) {
  console.log(duration, 'duration')
  frontEnd.send([duration]);
})

frontEnd.on('message', function(msg){
  console.log(msg.toString(), '收到消息')
});
