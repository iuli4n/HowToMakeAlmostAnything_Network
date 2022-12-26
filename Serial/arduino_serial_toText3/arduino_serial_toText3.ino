// Sends 3 numerical values to the serial port

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(A0, INPUT);
}


void loop() {

  // SEND TO COMPUTER 3 integer values separated by comma

  int data0 = analogRead(A0);
  int data1 = 123;
  int data2 = 456;
  
  Serial.print(data0);
  Serial.print(",");
  Serial.print(data1);
  Serial.print(",");
  Serial.print(data2);
  Serial.println();

  delay(100); // a bit of delay so the communication buffer doesn't get overloaded
}
