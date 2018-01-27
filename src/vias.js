const EventEmitter = require('events');
const { VISClient } = require('./vias_h2018');

// === Vehicle Data Path

const GPS_LATITUDE  = 'Signal.Cabin.Infortainment.Navigation.Currentlocation.Latitude';
const GPS_LONGITUDE = 'Signal.Cabin.Infortainment.Navigation.Currentlocation.Longitude';   //lng
const GPS_ALTITUDE  = 'Signal.Cabin.Infortainment.Navigation.Currentlocation.Altitude';    //alt
const GPS_HEADING   = 'Signal.Cabin.Infortainment.Navigation.Currentlocation.Heading';     //head
const GPS_SPEED     = 'Signal.Cabin.Infortainment.Navigation.Currentlocation.Speed';       //speed

const VEHICLE_SPEED = 'Signal.Drivetrain.Transmission.Speed';
const ENGINE_SPEED  = 'Signal.Drivetrain.InternalCombustionEngine.RPM';
const STEER_ANGLE   = 'Signal.Chassis.SteeringWheel.Angle';
const ACCEL_PEDAL   = 'Signal.Chassis.Accelerator.PedalPosition'; //AccelPedal
const BRAKE_PEDAL   = 'Signal.Chassis.Brake.PedalPosition';       //BrakePedal
const PARKINGBRAKE  = 'Signal.Chassis.ParkingBrake.IsEngaged';    //ParkingBrake
const ACCEL_X = 'Signal.Vehicle.Acceleration.X';    //Accel-x
const ACCEL_Y = 'Signal.Vehicle.Acceleration.Y';    //Accel-y
const ACCEL_Z = 'Signal.Vehicle.Acceleration.Z';    //Acdel-z

const GYRO_X = 'Signal.Vehicle.Acceleration.Pitch';   //Gyro-x
const GYRO_Y = 'Signal.Vehicle.Acceleration.Roll';    //Gyro-y
const GYRO_Z = 'Signal.Vehicle.Acceleration.Yaw';     //Gyro-z

const GEAR = 'Signal.Drivetrain.Transmission.Gear';              //Gear
const FUEL_LEVEL  = 'Signal.Drivetrain.FuelSystem.Level';               //FuelLevel
const FUEL_COMSUM = 'Signal.Drivetrain.FuelSystem.instantConsumption';  //instantFuelConsum
const DISTANCE_TOTAL = 'Signal.OBD.DistanceWithMIL';             //distanceTotal
const DOOR_FR   = 'Signal.Cabin.Door.Row1.Right.IsOpen';    //Door(f-r)     //Zone項目
const DOOR_FL = 'Signal.Cabin.Door.Row1.Left.IsOpen';     //Door(f-l)     //Zone項目
const BELT_FR = 'Signal.Cabin.Seat.Row1.Pos1.IsBelted';   //Seatbelt(f-r) //Zone項目

const LIGHT_LOWBEAM  = 'Signal.Body.Light.IsLowBeamOn';  //HeadLight
const LIGHT_HIGHBEAM = 'Signal.Body.Light.IsLowBeamOn';  //HeadLight
const LIGHT_BRAKE    = 'Signal.Body.Light.IsBrakeOn';    //BrakeLight
const LIGHT_PARKING  = 'Signal.Body.Light.IsParkingOn';  //ParkingLight

// === Sensor Data Path
const DRV_AWAKENESS     = 'Private.Signal.Driver.Awakeness';
const DRV_ATTENTIVENESS = 'Private.Signal.Driver.Attentiveness';
const PAS_AWAKENESS     = 'Private.Signal.Passenger.Awakeness';
const PAS_ATTENTIVENESS = 'Private.Signal.Passenger.Attentiveness';
const BCK_AWAKENESS     = 'Private.Signal.Backseat.Awakeness';
const BCK_ATTENTIVENESS = 'Private.Signal.Backseat.Attentiveness';

// === iPhone/iWatch/Sdtech
const HEARTRATE       = 'Private.Signal.Driver.Heartrate';
const CONCENTRATION   = 'Private.Signal.Driver.Concentration';
const IP_ALTITUDE     = 'Private.Signal.Driver.Altitude' // Altitude of driver device
const IP_ATOMPRESSURE = 'Signal.OBD.BarometricPressure'

// === MESH
const MESH_TEMPERATURE = 'Signal.Cabin.HVAC.AmbientAirTemperature';
const MESH_HUMIDITY    = 'Signal.Cabin.HVAC.AmbientAirHumidity';
const MESH_TRUNK       = 'Signal.Body.Trunk.IsOpen';

// === Bocco
const BOCCO_AIRCON = 'Signal.Cabin.HVAC.IsAirConditioningActive';
const BOCCO_WINDOW = 'Signal.Cabin.Door.Row1.Right.Window.Position';

var VISS_IP = '52.91.85.165';  //AWS1
var VISS_PORT='3001';
const viscOption = {
  'host': VISS_IP
  ,'protocol': 'ws://'
  ,'port': VISS_PORT
  ,'roomId': 'team-c-2018'
};

// == Subscribe sample ==
//var vias = new VISClient( viscOption );
class ViasClass extends EventEmitter {
  constructor() {
    super();
    this.vias = undefined;
    this.bConnected = false;
    this.connectCb = this.connectCb.bind(this);
    this.connectErrCb = this.connectErrCb.bind(this);
    this.disconnectCb = this.disconnectCb.bind(this);
    this.disconnectErrCb = this.disconnectErrCb.bind(this);
  }

  connectCb() {
    this.bConnected = true;
    console.log("Connected");

    // === subscribe ===
    // == Vehicle
    this.subscribe_ID("VEHICLE_SPEED");

    this.subscribe_ID("GPS_LATITUDE");
    this.subscribe_ID("GPS_LONGITUDE");
    this.subscribe_ID("GPS_ALTITUDE");
    this.subscribe_ID("GPS_HEADING");
    this.subscribe_ID("GPS_SPEED");
    this.subscribe_ID("ENGINE_SPEED");
    this.subscribe_ID("STEER_ANGLE");
    this.subscribe_ID("ACCEL_PEDAL");
    this.subscribe_ID("BRAKE_PEDAL");
    this.subscribe_ID("PARKINGBRAKE");
    this.subscribe_ID("ACCEL_X");
    this.subscribe_ID("ACCEL_Y");
    this.subscribe_ID("ACCEL_Z");

    this.subscribe_ID("GYRO_X");
    this.subscribe_ID("GYRO_Y");
    this.subscribe_ID("GYRO_Z");

    this.subscribe_ID("GEAR");
    this.subscribe_ID("FUEL_LEVEL");
    this.subscribe_ID("FUEL_COMSUM");
  //  this.subscribe_ID("POWER_MODE");
    this.subscribe_ID("DISTANCE_TOTAL");
    this.subscribe_ID("DOOR_FR");
    this.subscribe_ID("DOOR_FL");
    this.subscribe_ID("BELT_FR");

    this.subscribe_ID("LIGHT_LOWBEAM");
    this.subscribe_ID("LIGHT_HIGHBEAM");
    this.subscribe_ID("LIGHT_BRAKE");
    this.subscribe_ID("LIGHT_PARKING");

    // == Sensor
    this.subscribe_ID("DRV_AWAKENESS");
    this.subscribe_ID("DRV_ATTENTIVENESS");
    this.subscribe_ID("PAS_AWAKENESS");
    this.subscribe_ID("PAS_ATTENTIVENESS");
    this.subscribe_ID("BCK_AWAKENESS");
    this.subscribe_ID("BCK_ATTENTIVENESS");

    this.subscribe_ID("HEARTRATE");
    this.subscribe_ID("CONCENTRATION");
    this.subscribe_ID("IP_ALTITUDE");
    this.subscribe_ID("IP_ATOMPRESSURE");

    this.subscribe_ID("MESH_TEMPERATURE");
    this.subscribe_ID("MESH_HUMIDITY");
    this.subscribe_ID("MESH_TRUNK");

    this.subscribe_ID("BOCCO_AIRCON");
    this.subscribe_ID("BOCCO_WINDOW");

  }
  connectErrCb() {
    this.bConnected = false;
  }
  disconnectCb() {
    console.log("successfully disconnected");
    this.vias = undefined;
    this.bConnected = false;
  }
  disconnectErrCb() {
    console.log("Disconnect error");
    this.bConnected = false;
  }
  // === connect
  doConnect() {
    if (this.vias !== undefined || this.bConnected) {
      console.log("WebSocket already connected");
      return;
    }
    // viscOption.roomId = document.getElementById('roomid').value;
    this.vias = new VISClient( viscOption );
    console.log("Try to connect to VISServer");
    this.vias.connect(this.connectCb, this.connectErrCb);
  }

  // === disconnect
  doDisconnect() {
    if (this.vias === undefined || !this.bConnected) {
      console.log("WebSocket not connected");
      return;
    }
    this.vias.disconnect(this.disconnectCb, this.disconnectErrCb);
  }

  // === Subscribe
  subscribe_ID(_strID) {
    //dispValById(_strID, '');
    let varID = eval(_strID)
    this.vias.subscribe(varID, (_val) => {
      // dispValById(_strID, _val);
      // console.log(_strID, _val);
      
      this.emit('message', { type: _strID, val: _val });
    });
  }
}

module.exports = ViasClass;