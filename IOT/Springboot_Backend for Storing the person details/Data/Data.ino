void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

void loop() {
  // send a message to NodeMCU
  Serial.println("Hello from Arduino!");
  delay(1000); // wait for a second
}
