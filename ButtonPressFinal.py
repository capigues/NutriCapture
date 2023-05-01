import Jetson.GPIO as GPIO
import time
import os
from signal import pause

print("Waiting on button press...")

#callback function
def capture(channel):
    print("Taking photo")
    os.system("cd imgs && nvgstcapture-1.0 --automate --capture-auto --orientation 2")

#initialization of GPIO pins
GPIO.setmode(GPIO.BOARD) #reads the board and its corresponding pins
GPIO.setwarnings(False)
GPIO.setup(15, GPIO.IN) #sets pin 15 as input pin

GPIO.add_event_detect(15, GPIO.RISING, callback=capture, bouncetime=500)

try:
    pause()
except KeyboardInterrupt:
    GPIO.cleanup()