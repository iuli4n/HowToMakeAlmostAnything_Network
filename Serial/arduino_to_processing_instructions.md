# Description

These steps explain how to connect Processing4 to Arduino. (*This is NOT for Processing P5.js; instructions to do that are found in the WebSockets folder)



To do this connection you will need an Arduino connected through USB cable to a computer running Processing4, and we will use the AP-Sync library. 

These instructions are adapted from the library webpage [https://ap-sync.github.io/](https://ap-sync.github.io/)  

## 

## 1. Install library for the Arduino app

1. Download this zip file https://ap-sync.github.io/libs/AP_sync_arduino/AP_Sync.zip 

2. Extract zip file somewhere

3. Place Extracted folder with the name AP-Sync to Arduino's libraries folder
- On Windows and Macintosh machines, the default name of the folder is "Arduino" and is located in your Documents folder.

- More info: [Installing Libraries Manually | All About Arduino Libraries | Adafruit Learning System](https://learn.adafruit.com/adafruit-all-about-arduino-libraries-install-use/how-to-install-a-library) 
4. Restart Arduino IDE if initially open.

Done.



## 2. [in the Processing app] Installing the library on Processing

1. (Open Processing)

2. Open the menu Processing > Sketch > Import Library... > Add Library...

3. On the contribution manager, Search for AP-Sync

4. Click on AP-Sync and click Install.

Done.



## 3.  [in the Arduino app] Upload program to Arduino

```Arduino C++
// - FOR ARDUINO

//- This program takes the value from analog input A0 and sends it to processing

//- The value is divided by 4 (to map from 0-1024 to 0-255) and sent into variable "randomRed" in Processing

#include <AP_Sync.h>

AP_Sync streamer(Serial);

void setup() {

  Serial.begin(9600);

}

void loop() {

  streamer.sync("randomRed", analogRead(A0) / 4);

  delay(10);

}
```



## 4. [in the Processing app] Run the program in Processing, after changing the serial port id

```Processing4 Java
//- For PROCESSING

//- Run this while the Arduino is connected to the computer

//- When you first run this, change "COM3" to the name of your Arduino com port (on mac it'll start with "/dev/...")

//- This program receives variable "randomRed" with values 0-255 and then changes the background color accordingly

import apsync.*;

import processing.serial.*;

AP_Sync streamer;


// This is the variable that will be populated from the Arduino
public int randomRed;


void setup(){

  size(500,300);

  streamer = new AP_Sync(this,"COM3", 9600);

}

void draw() {

  println(randomRed);

  background(randomRed);

}
```




