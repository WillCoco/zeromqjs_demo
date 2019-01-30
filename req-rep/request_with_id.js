var zmq = require('zeromq');
const socketReq = zmq.socket('req');


class SocketReqPy {
  constructor(source) {
    this.counter = 0;
    this.handlers = {};

    this.source = 'tcp://127.0.0.1:8087';
    this.s = socketReq.connect(this.source);
    this.s.setMaxListeners(0);
    console.log(`connect req ${this.source}`);
    this.s.on('message', (data) => this.onMessage(data))
  }

  onMessage(data) {
    var res = JSON.parse(data);
    this.handlers[res.id](res.data);
    delete this.handlers[res.id];
  }

  request(amount, clb) {
    // todo: 一些耗时长的请求宽容超时
      this.counter++;
      const param = {
        id: this.counter,
        data: {method:'getestimatedfee', params: ['bitcoin', amount, [['mmbLUc8zE3XCh72sEPsYdmf4WxB33tP56h', amount]], 'high', 1, 0]}
      };
      this.s.send(JSON.stringify(param));
      this.handlers[this.counter] = clb;
  }
}

const req = new SocketReqPy();

function get (p) {
  return new Promise((suc, fail) => {
    req.request(p, (res) => {
      suc(res)
    })
  })
}

get(1).then(res => console.log(res));
get(2).then(res => console.log(res));
get(3).then(res => console.log(res));
get(4 ).then(res => console.log(res));
