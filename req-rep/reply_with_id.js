var zmq = require('zeromq');
var rep = zmq.socket('rep');

// let t = [4000, 3000, 2000, 1000, 0]
let t = [4000, 0];
let m = 0;

rep.on('message', function(p){
  m++;
  setTimeout(() => {
    p = JSON.parse(p);
    console.log('rep:'+p.id)
    const res = {id: p.id, data: p.data}
    rep.send(JSON.stringify(res));
  }, t[m % 2])
});

rep.bind('tcp://127.0.0.1:8087', function (error) {
  if (error) console.error(error);;
  console.log('server ready!')
})
