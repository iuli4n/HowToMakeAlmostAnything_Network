/*********
 * Makes the ESP32 function as a websocket server that sends 3 numeric data to websocket, and receives 1 number (if >0 makes something happen)
 * Based on code from https://RandomNerdTutorials.com/esp32-websocket-server-arduino/
 *********/

// enable this line only if you're using M5STICKC
//#define USINGM5STICKC

// Import required libraries
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#ifdef USINGM5STICKC 
  #include <M5StickC.h>
#endif


// ==== Replace with your network credentials ====

const char* ssid = "IULI3";      // WIFI SSID
const char* password = "96268353"; // WIFI PASSWORD

bool ledState = 0;
const int ledPin = 13;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");


// send message to all websocket clients
void notifyClients() {
  ws.textAll(String(ledState));
}

// handle incoming websocket message (assumes incoming text is a number)
void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;

    Serial.println(String("Received: ")+String((char*)data));

    // convert received text to int and check if >0
    if (String((char*)data).toInt() > 0) {
      ledState = 1;
    } else {
      ledState = 0;
    }
          
  }
}

// set up websocket events for connecting, disconnecting, errors, and data received from websocket
void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      #ifdef USINGM5STICKC 
        M5.Lcd.print("WebSocket client connected ");
      #endif
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      #ifdef USINGM5STICKC 
        M5.Lcd.print("WebSocket client disconnected\n");
      #endif
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}


void setup(){

  pinMode(ledPin, OUTPUT);
  
  #ifdef USINGM5STICKC 
    M5.begin();                         // Init M5Stick.  初始化 M5Stick
    M5.Lcd.setRotation(3);              // Rotate the screen.  旋转屏幕
    M5.Lcd.print("\nInitializing...\n");  // print format output string on
  #else
    // Serial port for debugging purposes
    Serial.begin(115200);
  #endif

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);

    #ifdef USINGM5STICKC 
      M5.Lcd.print("\nIConnecting to Wifi...\n");  // print format output string on
    #endif
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP Local IP Address
  Serial.println(WiFi.localIP());
  #ifdef USINGM5STICKC 
    M5.Lcd.print(WiFi.localIP());  // print format output string on
  #endif
  
  initWebSocket();

  // Start server
  server.begin();
}

void loop() {
  ws.cleanupClients(); // drop any disconnected clients from websocket

  digitalWrite(ledPin, ledState ? HIGH : LOW);
  
  // these values will be sent to the websocket - change them if you want to send something else
  int x = 123;
  int y = 456; 
  int z = 789;

  #ifdef USINGM5STICKC 
    // display LED state on the screen and send the button states to websocket
    M5.Lcd.fillRect(15, 5, 50, 50, ledState?RED:BLUE);
    x = M5.BtnA.read();
    y = M5.BtnB.read();
  #endif
  
  ws.textAll(String("")+ x + "," + y + "," + z);

  // give time for the websocket to send - if no delay, the websocket send buffer will get too full
  delay(200);
}
