import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate('/home/pi/Desktop/Final/cv/')
firebase_admin.initialize_app(cred)
db = firestore.client()
import time
import datetime
from time import sleep
from picamera import PiCamera
from cv import lock
import pyrebase
import threading
import os
def firebase(n):
    firebaseConfig = {
    
      };

    firebase = pyrebase.initialize_app(firebaseConfig)

    storage = firebase.storage()


    camera = PiCamera()

    
    if(n=='Unknown'):
        camera.start_preview(fullscreen=False, window = (125,10,640,480))
        filename = n+(time.strftime("%y%b%d_%H:%M:%S")) + ".jpg"
        camera.capture(filename)
        storage.child('Users/Kiran/Unknown/'+filename).put(filename)
        auth=firebase.auth()
        email="kiran.kicchu@gmail.com"
        password="123456"
        user=auth.sign_in_with_email_and_password(email,password)
        url=storage.child('Users/Kiran/Unknown/'+filename).get_url(user['idToken'])
        print(url)
        doc_ref = db.collection(u'UserUnknownPhoto').document(u'wzrpRyRqmdYdBss624Gt5qL3c3F2')
        doc_ref.set({
            u'date': firestore.SERVER_TIMESTAMP,
            u'url': url
        })
        print("Image sent")
        # Create a callback on_snapshot function to capture changes
#         callback_done = threading.Event()
#         def on_snapshot(doc_snapshot, changes, read_time):
#             print("in first")
#             print(doc_snapshot)
#             time.sleep(30)
#             for doc in doc_snapshot:
#                 print(f'Received document snapshot: {doc.data().message}')
#                 #print('in on snapchat')
#             callback_done.set()
# 
#         doc_ref_2 = db.collection(u'UsersLockStatus').document(u'wzrpRyRqmdYdBss624Gt5qL3c3F2')
#         print(doc_ref_2)
# 
#         doc_watch = doc_ref_2.on_snapshot(on_snapshot)
#         print(doc_watch)
        
        # Create an Event for notifying main thread.
        # Create a callback on_snapshot function to capture changes
        doc_ref = db.collection(u'UsersLockMessage').document(u'wzrpRyRqmdYdBss624Gt5qL3c3F2')
        time.sleep(20)
        doc = doc_ref.get()
        if doc.exists:
            print(f'Document data: {doc.to_dict()}')
            mess1=doc.to_dict()
            
            if mess1 == {}:
                m = "No message from admin"
                os.system(f'espeak "{m}"') 
#                 speaker.speak(m)
            else:
                mess=mess1['message']
                loc=mess1['lockData']
                os.system(f'espeak "{mess}"')
                lock.lock(loc)
        else:
            
            speaker.speak(m)
        '''while True:
        time.sleep(1)
        print('processing')
        time.sleep(20)'''
        camera.close()
    else:
        filename = n+(time.strftime("%y%b%d_%H:%M:%S")) + ".jpg"
        camera.capture(filename)
        storage.child('Users/Kiran/userList/'+filename).put(filename)
        auth=firebase.auth()
        email="kiran.kicchu@gmail.com"
        password="123456"
        user=auth.sign_in_with_email_and_password(email,password)
        url=storage.child('Users/Kiran/userList/'+filename).get_url(user['idToken'])
        doc_ref = db.collection(u'AuthorisedUser').document(u'wzrpRyRqmdYdBss624Gt5qL3c3F2')
        user = {u'date': firestore.SERVER_TIMESTAMP,u'name': n,u'url': url}
        doc_ref_1 = doc_ref.collection(u'users').document(n)
        doc_ref_1.set({
            u'date': firestore.SERVER_TIMESTAMP,
            u'name': n,
            u'url': url
        })
        print("Image sent")
        
        camera.close()


