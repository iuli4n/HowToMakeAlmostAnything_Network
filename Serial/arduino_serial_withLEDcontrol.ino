// Sends 3 numerical values to the serial port, and reads one numerical value (then turns onboard LED if that value is >0)

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(A0, INPUT);
  pinMode(13, OUTPUT);
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


  // RECEIVE FROM COMPUTER a text value that gets converted into int
  while (Serial.available()) {
    String s = Serial.readStringUntil('\n');

    // TURN ON LED if the value from computer is >0
    int x = s.toInt();
    if (x > 0) {
      digitalWrite(13, HIGH);
    } else {
      digitalWrite(13, LOW);
    }
  }
}
