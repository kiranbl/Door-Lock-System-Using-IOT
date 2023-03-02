from gpiozero import MotionSensor
from cv import face_recognicing
import time

pir = MotionSensor(4)
while True:
    pir.wait_for_motion()
    print("MOTION DETECTED")
    face_recognicing.face()
    time.sleep(30)
    

