const server = require('http').createServer();
const io = require('socket.io')(server);
const EventEmitter = require('events');

class SocketIO extends EventEmitter {
  constructor(config) {
    super();

    this.io = io;
    this.io = io.of(config.nameSpace);

    this.io.on('connection', (client) => {
      client.on('message', (data) => {
        this.emit('message', data);
      });

      client.on('extra', (data) => {
        this.emit('extra', data);
      });

      client.on('disconnect', () => {
        console.log(`${config.logName} disconnected`);
      });

      console.log(`${config.logName} connected`);
      this.emit('connection');
    });

    server.listen(config.port, () => {
      console.log(`${config.logName} server start: { port: ${config.port}, NameSpace: ${config.nameSpace} }`);
    });
  }

  send(text) {
    this.io.send(text);
  }

  ioemit(evt, cb) {
    this.io.emit(evt, cb);
  }
}

module.exports = SocketIO;