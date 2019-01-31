var zmq = require('zeromq');
var frontEnd = zmq.socket('dealer');
frontEnd.identity = randomString();

class Client {
  constructor(source) {
    this.counter = 0; // 请求计数
    this.handlers = {}; // 储存回调函数
    this.source = source;
    this.socket = frontEnd.connect(this.source);

    this.socket.on('message', data => this.onMessage(data));
  }

  // 监听到回复消息，根据请求id调用回调函数
  onMessage(dataJson) {
    console.log(dataJson.toString(),9191)
    const res = JSON.parse(dataJson.toString());
    console.log(res, 'res')
    if (typeof this.handlers[res.requestId] === 'function') {
      this.handlers[res.requestId](res.data);
      delete this.handlers[res.requestId];
    }
  }

  // 发送消息，储存回调
  send(data, clb) {
    this.counter++;
    const param = {
      requestId: this.counter,
      data
    };

    // console.log('Tag PyServer params:', JSON.stringify(param));
    this.socket.send(JSON.stringify(param));
    if (typeof clb === 'function') {
      this.handlers[this.counter] = clb;
    }
    console.log(this.handlers, 333)
  }

  // callback => promise
  request(data) {
    return new Promise((resolve, reject) => {
      this.send(data, (res) => {
        if (res) {
          resolve(res)
        } else {
          reject(new Error('no reply!!'))
        }
      })
    })
  }

}

const SocketClient = new Client('tcp://127.0.0.1:8088');

// 回调写法
SocketClient.send({duration: 1000}, (res) => {console.log(res, 'res-callback')});

// 链式调用
SocketClient.request({duration: 1000}).then(res => console.log(res, 'res-promise'));

// 随机字符串
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
