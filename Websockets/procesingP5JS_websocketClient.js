// Connects to the websocket server and moves an ellipse on the screen based on the number it receives from the websocket

// where the serial server is (your local machine):
var host = 'localhost:8000';
var socket; // the websocket
var sensorValue = 0; // the sensor value

function setup() {
  createCanvas(400, 400);
  // connect to server:
  socket = new WebSocket('ws://' + host);
  // socket connection listener:
  socket.onopen = sendIntro;
  // socket message listener:
  socket.onmessage = readMessage;
}

function draw() {
  background("#2307AF");
  fill(255);
  ellipse(sensorValue*10 % width, height / 2, 20, 20);
  text(sensorValue, 20, 20);
}

function sendIntro() {
  // convert the message object to a string and send it:
  socket.send("Hello");
}

function readMessage(event) {
  // assumes it receives one number
  var msg = event.data; // read data from the onmessage event
  sensorValue = Number(msg);
  println("Received: "+sensorValue); // print it
}
