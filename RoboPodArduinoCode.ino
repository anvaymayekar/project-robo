#include <SoftwareSerial.h>
#include <NewPing.h>

// author: @anvaymaykar

SoftwareSerial BT(2, 3);

const int M1_F = 9;
const int M1_R = 10;
const int M2_F = 11;
const int M2_R = 12;

const int trigPin = 4;
const int echoPin = 5;
const int MAX_DISTANCE = 400;

const int rightIR = A1;
const int leftIR = A2;

const int OBSTACLE_THRESHOLD = 20;
const float IR_SCALING = 0.01;
const int TURN_DELAY = 400;
const int MOTOR_DELAY = 100;

int incomingByte;
int distance = 100;
bool autopilot = false;

NewPing sonar(trigPin, echoPin, MAX_DISTANCE);

// Function prototypes
void setup();
void loop();
void stop();
void forward();
void backward();
void right();
void left();
void handleManualCommand(char cmd);
void autopilotMode();
int getDistance();

void setup() {
  pinMode(M1_F, OUTPUT);
  pinMode(M1_R, OUTPUT);
  pinMode(M2_F, OUTPUT);
  pinMode(M2_R, OUTPUT);

  pinMode(rightIR, INPUT);
  pinMode(leftIR, INPUT);

  Serial.begin(9600);
  BT.begin(9600);
  stop();
}

void loop() {
  if (BT.available()) {
    incomingByte = BT.read();

    if (incomingByte == 'A') {
      autopilot = true;
    } else if (incomingByte == 'S') {
      autopilot = false;
      stop();
    } else {
      autopilot = false;
      handleManualCommand(incomingByte);
    }
  }

  if (autopilot) {
    autopilotMode();
  }
}

int getDistance() {
  return sonar.ping_cm();
}

void autopilotMode() {
  distance = getDistance();
  float rightSensor = analogRead(rightIR) * IR_SCALING;
  float leftSensor = analogRead(leftIR) * IR_SCALING;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" | Right IR: ");
  Serial.print(rightSensor);
  Serial.print(" | Left IR: ");
  Serial.println(leftSensor);

  if (distance > 0 && distance < OBSTACLE_THRESHOLD) {
    stop();
    delay(500);
    backward();
    delay(500);

    if (leftSensor < rightSensor) {
      right();
      delay(TURN_DELAY);
    } else if (rightSensor < leftSensor) {
      left();
      delay(TURN_DELAY);
    } else {
      right();
      delay(TURN_DELAY);
    }

    forward();
  } else {
    forward();
  }
}

void handleManualCommand(char cmd) {
  switch (cmd) {
    case 'F': forward(); break;
    case 'B': backward(); break;
    case 'R': right(); break;
    case 'L': left(); break;
    case 'S': stop(); break;
  }
}

void stop() {
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, LOW);
  delay(MOTOR_DELAY);
}

void forward() {
  BT.println("FORWARD");
  digitalWrite(M1_F, HIGH);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, HIGH);
  digitalWrite(M2_R, LOW);
  delay(MOTOR_DELAY);
}

void backward() {
  BT.println("BACKWARD");
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, HIGH);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, HIGH);
  delay(MOTOR_DELAY);
}

void right() {
  BT.println("RIGHT");
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, HIGH);
  digitalWrite(M2_F, HIGH);
  digitalWrite(M2_R, LOW);
  delay(MOTOR_DELAY);
}

void left() {
  BT.println("LEFT");
  digitalWrite(M1_F, HIGH);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, HIGH);
  delay(MOTOR_DELAY);
}
