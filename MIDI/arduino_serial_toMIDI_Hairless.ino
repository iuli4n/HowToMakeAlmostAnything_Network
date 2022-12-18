// Most basic way of connecting Arduino to MIDI - requires HairlessMIDI to run on the computer to translate serial to a MIDI device
// Some other examples / instructions:
//    midi from analog input: https://forum.arduino.cc/t/hairless-midi-sending-data-continuously/944656/12
//    midi from buttons: https://www.instructables.com/Send-and-Receive-MIDI-with-Arduino/

byte noteON = 144;//noteon command code

void setup() {
  Serial.begin(9600);// in HairlessMIDI you will need to use the same rate
}

//send MIDI message to USB. you will need to use HairlessMIDI to transform this into an actual MIDI device connection
void MIDImessage(byte command, byte data1, byte data2) {
  Serial.write(command);
  Serial.write(data1);
  Serial.write(data2);
}

void loop() {

  MIDImessage(noteON, 60, 127);//turn note 60 on with 127 velocity
  delay (1000);

  MIDImessage(noteON, 60, 0);//turn note 60 off
  delay (1000);
}


