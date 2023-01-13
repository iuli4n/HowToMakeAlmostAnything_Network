// This starts a websocket server and sends text "C1,C2,C3" through the websocket //<>//
//
// Requires Websockets library v0.1b by Lasse S.B. imported through the Sketch>Add Library menu


import websockets.*;

int C1,C2,C3;

WebsocketServer ws;
int now;
float x,y;


void setup()
{
  size(900,900); //<>//

  // websocket runs on localhost:8317
  ws= new WebsocketServer(this,8317,"/");
  now=millis();
  x=0;
  y=0;

}

void draw()
{
  background(255);
  
  C1 = mouseX;
  C2 = mouseY;
  C3 = mouseX+mouseY;
  
  if(millis()>now+10){
    wsuSend();   
    now=millis();
  }
}


void webSocketServerEvent(String msg){
 println("RECEIVED FROM WEBSOCKET: "+msg);
 x=random(width);
 y=random(height);
}

// Send the variables to the websocket, by first splitting them up into low/high bytes
void wsuSend() {
  
  /** if you want to split up the data into byte chunks do this
    int x1 = (int) (C1 & 0xFF);;
    int x2 = (int) ((C1 >> 8) & 0xFF);
    
    int y1 = (int) (C2 & 0xFF);;
    int y2 = (int) ((C2 >> 8) & 0xFF);
 
    int z1 = (int) (C3 & 0xFF);;
    int z2 = (int) ((C3 >> 8) & 0xFF);
   
   String msg = "{\"stream\":[0,"+x2+","+x1+","+y2+","+y1+","+z2+","+z1+",0,0]}"; 
   ***/
   
   String msg = ""+C1+","+C2+","+C3;
   ws.sendMessage(msg);
   println(msg);
    
}
