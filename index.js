const ViasClass = require('./src/vias');
const SocketIO = require('./src/SocketIO');

const socket = new SocketIO({
  logName: 'client',
  nameSpace: '/dummy',
  port: 9000,
});
socket.on('message', (data) => {
  console.log(data);
});

const vias = new ViasClass();
vias.doDisconnect();
vias.doConnect();
vias.on('message', (data) => {
  // console.log(data);
  // socket.send({ type: 'やったね' });
});
