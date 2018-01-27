const ViasClass = require('./src/vias');

const vias = new ViasClass();
vias.doConnect();
vias.on('message', (data) => {
  console.log(data);
});
