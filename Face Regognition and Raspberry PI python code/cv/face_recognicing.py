import gpiozero
from gpiozero import MotionSensor
import time
from time import sleep
import cv2
import numpy as np
import os
import time
from cv import sense
import RPi.GPIO as GPIO
from cv import sms
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
         time.sleep(20)
         GPIO.output(relay,0)
    elif changePin == 0:
          print ("Locked")
          GPIO.output(relay, 0)

def face():

    os.chdir("/home/pi/Desktop/Final/cv/bin/haar-cascade-files-master")
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read('/home/pi/Desktop/Final/cv/trainer/trainer.yml')
    cascadePath = "haarcascade_frontalface_default.xml"
    faceCascade = cv2.CascadeClassifier(cascadePath);

    font = cv2.FONT_HERSHEY_SIMPLEX
    pir = MotionSensor(False)
    #iniciate id counter
    id = 0

    # names related to ids: example ==> KUNAL: id=1,  etc
    names = ['None', 'Moni', 'Chandan', 'kiran', 'Z', 'W']

    # Initialize and start realtime video capture
    cam = cv2.VideoCapture(-1)
    cam.set(3, 640) # set video widht
    cam.set(4, 480) # set video height

    # Define min window size to be recognized as a face
    minW = 0.1*cam.get(3)
    minH = 0.1*cam.get(4)

    
        #pir.wait_for_motion()
        #print("motion detected")
    ret, img =cam.read()
        #img = cv2.flip(img, -1) # Flip vertically
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor = 1.2,
        minNeighbors = 5,
        minSize = (int(minW), int(minH)),
        )

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)
        id, confidence = recognizer.predict(gray[y:y+h,x:x+w])
        id2, con1= recognizer.predict(gray[y:y+h,x:x+w])

            # Check if confidence is less them 100 ==> "0" is perfect match
        if (confidence < 100):
            id = names[id]
            confidence = "  {0}%".format(round(100 - confidence))
            con1=format(round(100 - con1))
        else:
            id = "unknown"
            confidence = "  {0}%".format(round(100 - confidence))
            con1=format(round(100 - con1))

        cv2.putText(img, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
        cv2.putText(img, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)
            
        time.sleep(1)
        if(int(con1) > 60):
            print(con1)
            cv2.destroyAllWindows()
            os.system('espeak "welcome"')
            lock(1)
                
                
                
        else:
            cam.release()
            cv2.destroyAllWindows()
            print("unknown")
            sms.smssend()
                # Create an Event for notifying main thread.
            sense.firebase('Unknown')
            exit()
                
                
                
                

        cv2.imshow('camera',img)

        k = cv2.waitKey(10) & 0xff # Press 'ESC' for exiting video
        if k == 27:
            break

    # Do a bit of cleanup
    #print("\n [INFO] Exiting Program and cleanup stuff")
    cam.release()
    cv2.destroyAllWindows()
