
// FYECS1 - GROUP VI

#include <SoftwareSerial.h>
#include <NewPing.h>

SoftwareSerial BT(2, 3); // RX, TX

const int M1_F = 9;
const int M1_R = 10;
const int M2_F = 11;
const int M2_R = 12;

const int trigPin = 4;
const int echoPin = 5;

const int max = 400;

const int rightIR = A1;
const int leftIR = A2;

int incommingByte;
int distance = 100;

bool autopilot = false;
NewPing sonar(trigPin, echoPin, max);

//---------------------------------------

void setup()
{
  pinMode(M1_F, OUTPUT);
  pinMode(M1_R, OUTPUT);
  pinMode(M2_F, OUTPUT);
  pinMode(M2_R, OUTPUT);



  pinMode(rightIR, INPUT);
  pinMode(leftIR, INPUT);


  Serial.begin(9600);
  BT.begin(9600);
}

//---------------------------------------

int getDistance() {
    return sonar.ping_cm();
}

void autopilotMode() {
    int distance = getDistance();
    float rightSensor = analogRead(rightIR) * 0.01;
    float leftSensor = analogRead(leftIR) * 0.01; 
    
    if (distance < 20) {
      Serial.println(distance);
      Serial.println(rightSensor);
      Serial.println(leftSensor);

        stop();
        delay(500);
        backward();
        delay(500);
        if (leftSensor < rightSensor) {
            right();
            delay(400);
     
        } else if (rightSensor < leftSensor) {
            left();
            delay(400);

        } else {
            right();
            delay(400);

        }
        forward();
    } else {
        forward();
    }
}
void loop()
{
  if (BT.available() > 0)
  {
    incommingByte = BT.read();
    if (incommingByte == 'A'){
      autopilot = true;
    } else {
      autopilot = false;
      switch (incommingByte)
      {
        case 'F': forward();
          break;
        case 'B': backward();
          break;
        case 'S': stop();
          break;
        case 'R': right();
          break;
        case 'L': left();
          break;

      }
    }
  }


 while (autopilot) {
  incommingByte = BT.read();
    if (incommingByte == 'S'){
      autopilot = false;
    }
    autopilotMode();
    }

  
}
//-----------------------------------------------

void stop()
{
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, LOW);
  delay(100);
}
void forward()
{
  BT.println("FORWARD");
  digitalWrite(M1_F, HIGH);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, HIGH);
  digitalWrite(M2_R, LOW);
delay(100);
}
void backward()
{
  BT.println("BACKWARD");
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, HIGH);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, HIGH);
delay(100);
}
void right()
{
  BT.println("RIGHT");
  digitalWrite(M1_F, LOW);
  digitalWrite(M1_R, HIGH);
  digitalWrite(M2_F, HIGH);
  digitalWrite(M2_R, LOW);
  delay(100);
}
void left()
{
  BT.println("LEFT");
  digitalWrite(M1_F, HIGH);
  digitalWrite(M1_R, LOW);
  digitalWrite(M2_F, LOW);
  digitalWrite(M2_R, HIGH);
  delay(100);
}


