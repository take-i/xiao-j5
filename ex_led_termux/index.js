var net = require('net');
var five = require('johnny-five'); 
var mock = require('mock-require');
mock('@serialport/bindings', '@serialport/binding-mock');
var firmata = require('firmata');

var options = {
  // USB to TCP Bridge (BT/USB/TCP Bridge Pro)
  // https://play.google.com/store/apps/details?id=masar.bluetoothbridge.pro
  host: '192.168.1.82',  //host name or IP
  port: 1234  // port
}
var client = net.connect(options, function() { 

  console.log('Connected to USB2TCP Bridge');
  
  var socketClient = this;
  var io = new firmata.Board(socketClient);

  io.once('ready', function(){
    console.log('IO ready!');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
      console.log('Board connected!');
      // Here J5 code.
	  
      var led = new five.Led(13);
      
	  // LED Brink.
	  board.wait(2000, () => {
	    led.blink(500);
	  });
    });
  });

});
