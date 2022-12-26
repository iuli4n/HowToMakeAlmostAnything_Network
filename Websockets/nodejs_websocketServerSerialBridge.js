///
// This runs in node.js. 
// It connects to Serial port (ie: to an Arduino); and it makes a Websocket server.
// It then takes forwards data from Serial port to Websocket, and vice-versa. 
//
// TO RUN THIS:
//	  You'll need the serial device (Arduino) to be connected.
//    First put this in a folder where node.js is installed with the proper libraries. Will need slightly older versions of node.js and serialport:
// 		nvm install 14.17.5      (more installation docs)
// 		nvm use 14.17.5
// 		npm install serialport@9.2.8      
// 		npm install websocket@1.0.34
//
//  Then in that folder run it:
//		node _scriptname_.js  (where _scriptname_ is this file)
//		
// TO CONNECT FROM YOUR WEBSOCKET CLIENT, USE THIS:
//		ws://localhost:31337    (or replace localhost to your computer's IP if connecting from a distance)
//
// ISSUES:
//   0. (not an issue) If this app is running you can't use the serial port (ex: to program Arduino) unless you disconnect. 
//   1. If you restart/reconnect the Arduino you’ll need to restart the node.js script
//   2. Webpage lags sometimes you navigate away from the browser tab
//   3. Only one webpage can be connected to the Arduino at the same time
//   4. Web client may be too slow and get overwhelmed by these messages; if so, increase delay betweeen sending messages


var WS_PORT = 31337; // port for the websocket server

// set this to true if you don't have an Arduino connected but want fake data sent to websocket
var GENERATE_FAKE_ARDUINO_DATA = false;


///////////////////////////////////////////////////////////
// SERIAL CONNECTION
// When a message is received from Arduino, it's sent up to the websocket
// When a message is received from Websocket, it's sent down to the arduino


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM7', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data

// this will store the websocket connection
var connection = null;

// set up listener for opening serial port
port.on("open", () => {
  console.log('serial port open');
});

// set up listener for data received from serial port
parser.on('data', data =>{
  console.log('got word from arduino:', data);


  /////// WEBSOCKET BROADCAST
  // if websocket is connected, send the arduino values
  if (connection !== null) 
	{ 
		// there's someone on my websocket, send it the arduino data
		connection.sendUTF(data);
	}
});



///////////////////////////////////////////////////////////
// WEBSOCKET SERVER
// listens on computer port 1337, sends arduino values to anyone listening
//

// These two are only used when GENERATE_FAKE_ARDUINO_DATA = true
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
function sendFakeWSData() {
	connection.sendUTF((88 + getRndInteger(0,20)) );
	setTimeout(sendFakeWSData, 100);
}


// Make a WS server
var server = require('websocket').server, http = require('http');
var socket = new server({  
    httpServer: http.createServer().listen(WS_PORT)
});

// When someone connects and sends a message, will keep track of them and send them arduino data

socket.on('request', function(request) {  
    connection = request.accept(null, request.origin);

	// on first connection, send it a hello string
    connection.sendUTF('hello from node');

	// do this whenever a message is received from WS 
    connection.on('message', function(message) {
		
		// send it to console and to the arduino
		console.log(message.utf8Data);
		port.write(message.utf8Data + '\n');
    });

	// if we want to simulate a connected arduino, we will just generate fake data on the websocket
    if (GENERATE_FAKE_ARDUINO_DATA !== null && GENERATE_FAKE_ARDUINO_DATA) {
		setTimeout(sendFakeWSData, 100);
    }

    connection.on('close', function(connection) {
        console.log('connection closed');
		connection = null;
    });
});


