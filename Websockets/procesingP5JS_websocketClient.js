// Connects to the websocket server and moves an ellipse on the screen based on the number it receives from the websocket


//------------- WEBSOCKET START --------------
// HOW TO INTEGRATE INTO YOUR OWN SKETCH: 
//   1. Copy this whole part into your p5js sketch
//   2. Add ws_setup() to the setup() function as shown below
//   3. Then access the wsData1,2,3 variables

var ws_host = 'localhost:8000'; // address of the websocket server
var ws_socket; // socket we'll be using
var wsData1, wsData2, wsData3; // data we received from the socket

function ws_setup() {
  // connect to server:
  ws_socket = new WebSocket('ws://' + ws_host);
  // socket connection listener:
  ws_socket.onopen = ws_sendIntro;
  // socket message listener:
  ws_socket.onmessage = ws_readMessage;
  
  print("Websocket server started");
}

function ws_readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  //print("Received: "+msg); // print it

  // Assume we're getting 3 numerical values separated by comma: X,Y,Z
  
  const arduinoDataSplit = msg.split(",");

  wsData1 = parseInt(arduinoDataSplit[0]);
  wsData2 = parseInt(arduinoDataSplit[1]);
  wsData3 = parseInt(arduinoDataSplit[2]);
}

function ws_sendIntro() {
  ws_socket.send("Hello");
}

//------------- WEBSOCKET END ----------





function setup() {
  createCanvas(400, 400);
  ws_setup();
}

function draw() {
  background("#2307AF");
  fill(255);
  ellipse(wsData1*10 % width, height / 2, 20, 20);
  text(wsData1, 20, 20);
}

