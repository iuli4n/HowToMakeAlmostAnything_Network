// Most basic way of connecting Arduino to MIDI - requires HairlessMIDI to run on the computer to translate serial to a MIDI device

byte noteON = 144;//noteon command code

void setup() {
  Serial.begin(9600);// REMEMBER TO SET HAIRLESSMIDI to the same rate
}

int tick = 0;


//send MIDI message
void MIDImessage(byte command, byte data1, byte data2) {
  Serial.write(command);
  Serial.write(data1);
  Serial.write(data2);
}

void loop() {

  MIDImessage(noteON, 60, 127);//turn note 60 on with 127 velocity
  delay(200);//crude form of button debouncing

  delay (1000);

  MIDImessage(noteON, 60, 0);//turn note 60 off
  delay(2);//crude form of button debouncing

  delay (1000);
}


