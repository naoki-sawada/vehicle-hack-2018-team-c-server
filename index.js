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

let distance_past = 0;
let distance = 0;

let break_pedal_past = false;
let break_pedal = false;

let stress_tire_past = 0;
let stress_tire = 0;

vias.doDisconnect();
vias.doConnect();
vias.on('message', (data) => {

    if (data.type === 'DISTANCE_TOTAL') {
        if (distance_past === 0) {
            distance_past = data.val;
        }

        distance = data.val;

        if (distance > distance_past) {
            stress_tire += 5;
            distance_past = distance;
        }
    }

    if (data.type === 'BRAKE_PEDAL') {
        if (data.val === 'true' && break_pedal_past === false) {
            stress_tire += 2;
        }

        break_pedal_past = data.val === 'true';
    }

    if (data.type === 'ACCEL_Y') {
      if (data.val > 0.01) {
          stress_tire += 1;
      }
    }

    //
    if (stress_tire_past < stress_tire) {
        stress_tire_past = stress_tire;
        socket.send({ type: 'tire_stress', val: stress_tire });
    }

    // socket.send({ type: 'やったね' });
});
