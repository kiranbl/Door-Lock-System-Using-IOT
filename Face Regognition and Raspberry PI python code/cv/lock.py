
import time
import RPi.GPIO as GPIO
def lock(n):
    relay = 18;
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(relay,GPIO.OUT)

    GPIO.output(relay , 0)

    changePin = n 
    if changePin == 1:
         print ("UnLocked")
         GPIO.output( relay , 1)                
    elif changePin == 0:
          print ("Locked")
          GPIO.output(relay, 0)
            
        
