Turn an original G7000/G7400 joystick into a Bluetooth gamepad that
Videopac Vault can read, using a cheap ESP32 board as the go-between.
Keyboard controls (arrow keys + G, or whatever you've remapped in the
emulator's keybind menu) keep working the whole time - this only adds
a second input source, it doesn't replace anything.

## What to buy

- An ESP32 dev board (has Bluetooth built in). Any "ESP32-WROOM-32
  DevKit" or "ESP32 DevKitC" board works, ~$10-20; 3-packs (e.g. from
  ELEGOO) are often cheaper per board if you want spares.
- A "DE-9 (9-pin D-sub) to screw terminal" breakout adapter, a few
  dollars from the usual electronics sellers. This lets the joystick's
  existing plug connect non-destructively - no cutting into its cable.
  (Not required - you can wire directly into the joystick's cable
  instead if you'd rather.)
- Some jumper wires to go from the screw terminals to the ESP32's GPIO
  pins.

## Wiring

The Odyssey2/Videopac joystick port is a 9-pin D-sub - same shape as
an old Atari joystick or serial port, but wired differently:

    1 - Ground
    2 - Fire
    3 - Left
    4 - Down
    5 - Right
    6 - Up
    7,8,9 - not connected

This is from a fan-archived pinout, not an official source - verify
each pin against the joystick's actual switches with a multimeter
before wiring it to the ESP32 (worst case here is just "a direction
doesn't respond," not damage, since these are all low-voltage digital
inputs with internal pull-ups). See videopac_ble_joystick.ino for the
GPIO pin assignments to wire into.

## Flashing the firmware

1. Install the Arduino IDE and add ESP32 board support (Boards
   Manager > search "esp32" > install "esp32" by Espressif Systems).
2. Sketch > Include Library > Manage Libraries > search "BleGamepad"
   > install "ESP32 BLE Gamepad" by lemmingDev.
3. Open videopac_ble_joystick.ino, select your board under Tools >
   Board, and upload.
4. Pair "Videopac Joystick" from your computer's normal Bluetooth
   settings (not from inside Chrome) - it shows up as a regular
   Bluetooth gamepad.

## Using it

Once paired, just open the emulator and play - gamepad-bridge.js
(already wired into emulator/index.html) picks up the connected
gamepad automatically and feeds it in alongside the keyboard. Nothing
else to configure.

If a direction comes out wrong (e.g. up and down are swapped), it's
almost always a wiring mix-up on the pinout above, not the code -
check continuity on that pin again.
