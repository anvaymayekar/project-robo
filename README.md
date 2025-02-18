# ProjectRobo: Obstacle-avoiding robot with its dedicated Android application.
\
A simple Arduino circuit was built using HC-SR04 and some IR sensors with Bluetooth module HC-05 for dynamic control.
This project has been constructed under the regime of _Fabrication - Lab_ of **F.Y. B.Tech.** students of Shah & Anchor Kutchhi Engineering College, Mumbai - **ECS1 Group VI**.


---

## Note

> The React Native codebase is only configured for Android.
> After installing the *.apk* file in an Android device it is essential to manually grant it the permission of `'Nearby devices'` to enable Bluetooth interfacing.

---

## File structure

    - root
        > Robo_Pod (React Native codebase)
            > ...
                > ...
            > ...
            > App.tsx
            > app.json
        > app-release.apk (main .apk file)
        > RoboPodArduinoCode.ino (.ino file for robot)
        > images
            > ...

---

## Bluetooth Interface Chars

- **'F'** -> Forward
- **'B'** -> Backward
- **'S'** -> Stop
- **'R'** -> Right
- **'L'** -> Left
- **'A'** -> Autopilot

---

## Tools & Technologies

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Android Studio](https://img.shields.io/badge/android%20studio-346ac1?style=for-the-badge&logo=android%20studio&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
&nbsp;

---

## Electronics

`1. Arduino Uno (ATmega 328P) Board`

`2. L298N DC Motor Driver`

`3. HC-05 Bluetooth Transceiver Module`

`4. HC-SR04 Ultrasonic Sensor Module`

`5. LM393 IR Sensor (2 pcs)`

`6. 12 V | 1.2 A NiMH Battery with BMS`

`7. 200 RPM | 12 V 6mm DC Geared Motor (2 pcs)`

`8. DC Socket & Jack Connector`

`9. Switch / Toggle`

`10. Heavy Metal Chasis`

`11. GE White Tyre (7cm x 2cm) with a hole diameter of 6.1mm (2 pcs)`

`12. HC-SR04 Sensor Bracket`

`13. Caster Wheel`

`14. USB Type B Cable, jumper wires, nuts, bolts, screws & spacers`

---

## Dependencies

    - @types/react-native-vector-icons (^6.4.18)

    - react (18.3.1)

    - react-native (0.77.0)

    - react-native-asset (^2.1.1)

    - react-native-bluetooth-classic (^1.73.0-rc.12)

    - react-native-linear-gradient (^2.8.3)

    - react-native-vector-icons (^10.2.0)

---

## Author

> Anvay Mayekar,\
> B. Tech. in Electronics & Computer Science ~ SAKEC
> &nbsp;
>
> [![logo](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://www.github.com/anvaymayekar) [![logo](https://img.shields.io/badge/LinkedIn-0A66C2.svg?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://in.linkedin.com/in/anvaymayekar) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/anvaymayekar/)
