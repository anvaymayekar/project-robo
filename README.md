# 🤖 **ProjectRobo:** Obstacle-Avoiding Robot with Dedicated Android App


A smart and interactive robot built using **Arduino Uno**, **HC-SR04**, **IR sensors**, and a **Bluetooth interface (HC-05)**. The robot can be dynamically controlled via a custom **React Native Android app**, which provides both manual control and autonomous mode.

> 🛠️ This project was developed under the **Fabrication Lab** of **F.Y. B.Tech** students at **Shah & Anchor Kutchhi Engineering College**, Mumbai — **ECS1 Group VI**.

---

## 🔔 Note

> 📱 The **React Native** codebase is configured **only for Android**.
> ⚙️ After installing the `.apk` file, the app requires manual permission for **"Nearby Devices"** in Android settings to enable Bluetooth communication.

---

## 📁 File Structure

```
- root
    > Robo_Pod                     // 🤖 React Native App
        > ...
        > App.tsx
        > app.json
    > app-release.apk             // 📱 Android installable
    > RoboPodArduinoCode.ino      // 🔧 Arduino control sketch
    > images                      // 🖼️ Circuit diagrams / Robot previews
```

---

## 🔤 Bluetooth Commands

| Command | Action       |
| ------: | ------------ |
|   `'F'` | 🔼 Forward   |
|   `'B'` | 🔽 Backward  |
|   `'S'` | ⏹️ Stop      |
|   `'R'` | ➡️ Right     |
|   `'L'` | ⬅️ Left      |
|   `'A'` | 🤖 Autopilot |

---

## 🧰 Tools & Technologies

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![Android Studio](https://img.shields.io/badge/android%20studio-346ac1?style=for-the-badge\&logo=android%20studio\&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge\&logo=typescript\&logoColor=white)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge\&logo=Arduino\&logoColor=white)

---

## ⚙️ Electronics Used

1. 🔌 **Arduino Uno (ATmega328P)**
2. ⚙️ **L298N Dual Motor Driver**
3. 📡 **HC-05 Bluetooth Module**
4. 🧠 **HC-SR04 Ultrasonic Sensor**
5. 🔦 **LM393 IR Sensors ×2**
6. 🔋 **12V 1.2A NiMH Battery w/ BMS**
7. 🏎️ **200 RPM 12V DC Geared Motors ×2**
8. ⚡ **DC Socket + Jack Connector**
9. 🔘 **Toggle / Rocker Switch**
10. 🛠️ **Heavy Metal Chassis**
11. 🔧 **GE Tyres (7cm x 2cm, 6.1mm bore) ×2**
12. 🔩 **HC-SR04 Bracket Mount**
13. ⚪ **Caster Wheel**
14. 🧷 **Jumper Wires, Nuts, Bolts, Screws, Spacers**

---

## 📦 React Native Dependencies

```
- @types/react-native-vector-icons (^6.4.18)
- react (18.3.1)
- react-native (0.77.0)
- react-native-asset (^2.1.1)
- react-native-bluetooth-classic (^1.73.0-rc.12)
- react-native-linear-gradient (^2.8.3)
- react-native-vector-icons (^10.2.0)
```
---

## 👨‍💻 Author

> **Anvay Mayekar**
> 🎓 B.Tech in Electronics & Computer Science — SAKEC

[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge\&logo=GitHub\&logoColor=white)](https://www.github.com/anvaymayekar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2.svg?style=for-the-badge\&logo=LinkedIn\&logoColor=white)](https://in.linkedin.com/in/anvaymayekar)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge\&logo=Instagram\&logoColor=white)](https://www.instagram.com/anvaymayekar/)
