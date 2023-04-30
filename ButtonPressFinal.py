import Jetson.GPIO as GPIO
import time
import subprocess
import os

#initialization of GPIO pins

GPIO.setmode(GPIO.board) #reads the board and its corresponding pins
GPIO.setup(12, GPIO.IN) #sets pin 12 as input pin

GPIO.wait_for_edge(12, GPIO.rising)

os.system("nvgstcapture-1.0 --automate --capture-auto --orientation 2")

GPIO.cleanup()

time.sleep(2)

exit(0)