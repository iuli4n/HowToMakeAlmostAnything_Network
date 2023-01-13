// This starts a websocket server and sends C1,C2,C3 to Unity through the websocket //<>//
// C1,C2,C3 are positions of a marker from the Tuio AR marker tracking library
//
// Requires Websockets library v0.1b by Lasse S.B. imported through the Sketch>Add Library menu


import websockets.*;

int C1,C2,C3;

WebsocketServer ws;
int now;
float x,y;


void setup()
{
  size(900,900);
  setup_tuio(); //<>//
  
    ws= new WebsocketServer(this,8317,"/");
  now=millis();
  x=0;
  y=0;

}

void draw()
{
  background(255);
  textFont(font,18*scale_factor);
  
  // read all the TUIO objects into an array
  TuioObject[] tuioObjects = new TuioObject[255]; readTUIO(tuioObjects);
  
  // FIRST MARKER
  
  int markerID1 = 15;
  TuioObject markerRed = tuioObjects[markerID1];
  if (markerRed != null) {
    draw_marker(markerRed, color(255,0,0));
    println("The red marker is at x position "+markerRed.getScreenX(width));
  }  
    
  // SECOND MARKER
  
  int markerID2 = 13;
  TuioObject markerGreen = tuioObjects[markerID2];
  if (markerGreen != null) {
    draw_marker(markerGreen, color(0,255,0));
    println("The green marker is at x position "+markerGreen.getScreenX(width));
  }

  // BOTH MARKERS

  if (markerRed != null && markerGreen != null) {  
      // color the screen if both are found
      fill(color(255,0,0));
      rect(0,0, width,200);
  }
  
  
  
  if (markerRed != null) {
    int rx = markerRed.getScreenX(width);
    int ry = markerRed.getScreenY(height);
    C1 = rx;
    C2 = ry;
  }
  C3 = mouseX+mouseY;
  
  if(millis()>now+10){
    wsuSend();   
    now=millis();
  }
}




// draw a colored ellipse on top of the marker
// Note: TuioObject can give other data variables - see https://www.tuio.org/api/java/TUIO/TuioObject.html
void draw_marker(TuioObject marker, color col) {
  int xpos = marker.getScreenX(width);
  int ypos = marker.getScreenY(height);
  float angle = marker.getAngle(); 
  fill(col);
  ellipse(xpos, ypos, 200,200);
}

// reads all the active objects from TUIO and fills in the ones that are found; if markers won't be found, their positions will be left NULL
void readTUIO(TuioObject[] allObjects) {
  
  java.util.Arrays.fill(allObjects, null);
  
  ArrayList<TuioObject> tuioObjectList = tuioClient.getTuioObjectList();
  for (int i=0;i<tuioObjectList.size();i++) {  
    TuioObject tobj = tuioObjectList.get(i);
    allObjects[tobj.getSymbolID()] = tobj;
  }
}





void webSocketServerEvent(String msg){
 println("RECEIVED FROM WEBSOCKET: "+msg);
 x=random(width);
 y=random(height);
}

// Send the variables to the websocket, by first splitting them up into low/high bytes
void wsuSend() {
  
  /**** if you need numbers to be split up into bytes you can use this
    int x1 = (int) (C1 & 0xFF);;
    int x2 = (int) ((C1 >> 8) & 0xFF);
    
    int y1 = (int) (C2 & 0xFF);;
    int y2 = (int) ((C2 >> 8) & 0xFF);
 
    int z1 = (int) (C3 & 0xFF);;
    int z2 = (int) ((C3 >> 8) & 0xFF);
 
   String msg = "{\"stream\":[0,"+x2+","+x1+","+y2+","+y1+","+z2+","+z1+",0,0]}"; 
   ****/
   
   String msg = ""+C1+","+C2+","+C3;
   ws.sendMessage(msg);
   println(msg);
    
}
