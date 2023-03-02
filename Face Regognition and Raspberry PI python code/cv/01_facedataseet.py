import cv2
import os
import time
import face_training
import pyrebase

import sense

firebaseConfig = {
    "apiKey": "AIzaSyA5lf3OzM2yC7PMzxp3yJqedOjfmUaotR4",
    "authDomain": "iot-webapp-53fe3.firebaseapp.com",
    "databaseURL": "https://iot-webapp-53fe3-default-rtdb.firebaseio.com",
    "projectId": "iot-webapp-53fe3",
    "storageBucket": "iot-webapp-53fe3.appspot.com",
    "messagingSenderId": "1096874791295",
    "appId": "1:1096874791295:web:94066cdfd67ef03daa0a4a",
    "measurementId": "G-PPCJPELDPR"
};

firebase =pyrebase.initialize_app(firebaseConfig)

storage = firebase.storage()
cam = cv2.VideoCapture(-1)
cam.set(3, 640) # set video width
cam.set(4, 480) # set video height
face_detector = cv2.CascadeClassifier( "haarcascade_frontalface_default.xml" )
# For each person, enter one numeric face id
print("Add Face to the Authorised user by adding dataset") 
face_id = input('\n Enter user ID end press <Enter> ==>  ')
name=input('\n enter the name')
print("\n Initializing face capture. Look the camera and wait ...")
# Initialize individual sampling face count
count = 0
while(True):
    ret,img = cam.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector.detectMultiScale(gray, 1.3, 5)
    for (x,y,w,h) in faces:
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,0,0), 2)
        count += 1
        # Save the captured image into the datasets folder
        cv2.imwrite("dataset/User." + str(face_id) + '.' + str(count) + ".jpg", gray[y:y+h,x:x+w])
        cv2.imshow('image', img)
    k = cv2.waitKey(100) & 0xff # Press 'ESC' for exiting video
    
    if k == 27:
        break
    elif count >=400:
        
        print(count,'Images taken')# Take 30 face sample and stop video
          
        face_training.traindata()
        break
        
        
# Do a bit of cleanup
print("\n [INFO] Exiting Program and cleanup stuff")
cam.release()
sense.firebase(name)


