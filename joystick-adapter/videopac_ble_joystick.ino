/*
  Videopac / Odyssey2 joystick -> Bluetooth LE gamepad bridge, for an ESP32.

  Wiring (Odyssey2/Videopac joystick port is a 9-pin D-sub, same shape as an
  old Atari/serial DB9 but a DIFFERENT pinout - verify with a multimeter
  before trusting this, connectors on 40+ year old hardware are not always
  consistent):

      1 - Ground        (wire to any ESP32 GND pin)
      2 - Fire           -> GPIO 16
      3 - Left           -> GPIO 17
      4 - Down           -> GPIO 18
      5 - Right          -> GPIO 19
      6 - Up             -> GPIO 21
      7,8,9 - not connected

  The joystick is just switches to ground - no power pin needed, and no
  other components in line. Each switch pulls its pin low when pressed;
  the ESP32's internal pull-ups keep them high (i.e. "not pressed") the
  rest of the time. If you'd rather use a breakout board that plugs into
  the joystick's DE-9 plug (no cutting/soldering the joystick's own
  cable), any "DB9 to screw terminal" adapter works - wire its screw
  terminals to the GPIO pins above instead.

  Library required (Arduino IDE: Sketch > Include Library > Manage
  Libraries > search "BleGamepad" > install "ESP32 BLE Gamepad" by
  lemmingDev): https://github.com/lemmingDev/ESP32-BLE-Gamepad

  Once flashed, the ESP32 advertises as a Bluetooth gamepad named
  "Videopac Joystick" - pair it like any other Bluetooth device from
  your computer's Bluetooth settings (not from inside Chrome). Chrome's
  Gamepad API then sees it automatically; no browser-side pairing step.
*/

#include <BleGamepad.h>

// GPIO pins - change these if you wired it differently
const int PIN_FIRE  = 16;
const int PIN_LEFT  = 17;
const int PIN_DOWN  = 18;
const int PIN_RIGHT = 19;
const int PIN_UP    = 21;

// Button numbers sent over BLE (1-indexed, per BleGamepad's API).
// The web page (gamepad-bridge.js) reads these back in the same order
// as gamepad.buttons[0..4] - keep both ends in sync if you change this.
const int BTN_UP    = 1;
const int BTN_DOWN  = 2;
const int BTN_LEFT  = 3;
const int BTN_RIGHT = 4;
const int BTN_FIRE  = 5;

const unsigned long DEBOUNCE_MS = 15;

BleGamepad bleGamepad("Videopac Joystick", "DIY", 100);

struct Button {
  int pin;
  int bleButton;
  bool pressed = false;
  unsigned long lastChange = 0;
};

Button buttons[] = {
  { PIN_UP,    BTN_UP },
  { PIN_DOWN,  BTN_DOWN },
  { PIN_LEFT,  BTN_LEFT },
  { PIN_RIGHT, BTN_RIGHT },
  { PIN_FIRE,  BTN_FIRE },
};
const int NUM_BUTTONS = sizeof(buttons) / sizeof(buttons[0]);

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(buttons[i].pin, INPUT_PULLUP);
  }
  bleGamepad.begin();
  Serial.println("Videopac BLE joystick starting - pair it from your computer's Bluetooth settings.");
}

void loop() {
  if (!bleGamepad.isConnected()) {
    delay(50);
    return;
  }

  unsigned long now = millis();
  bool changed = false;

  for (int i = 0; i < NUM_BUTTONS; i++) {
    bool rawPressed = digitalRead(buttons[i].pin) == LOW; // grounded = pressed
    if (rawPressed != buttons[i].pressed && (now - buttons[i].lastChange) > DEBOUNCE_MS) {
      buttons[i].pressed = rawPressed;
      buttons[i].lastChange = now;
      changed = true;
      if (rawPressed) {
        bleGamepad.press(buttons[i].bleButton);
      } else {
        bleGamepad.release(buttons[i].bleButton);
      }
    }
  }

  if (changed) {
    bleGamepad.sendReport();
  }

  delay(5);
}
