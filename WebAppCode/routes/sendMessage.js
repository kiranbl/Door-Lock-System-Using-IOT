const express = require("express");
const app = express();

const firebase = require("firebase");
require("firebase/firestore");


var db = firebase.firestore();
const ejs = require("ejs");

const { body, check, validationResult } = require("express-validator");


app.set("view engine", "ejs");

var router = express.Router();

router.get("/", function (req, res) {

   


});

router.post(
  "/",
  function (req, res) {
  
    // function writeUserDataWithCompletion(userId, speakmessage) {
    //   var date = new Date().toUTCString();

    
    //   firebase.database().ref('users/' + userId +'/messages').set({
    //     message: speakmessage,
    //     date : date
    //   }, (error) => {
    //     if (error) {
    //       res.json(error)
    //     } else {
    //       res.json("data saved")
    //     }
    //   });
      
    // }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      
        var speakmessage = req.body.message ;
    
        // writeUserDataWithCompletion(user.uid,speakmessage);

        var date = new Date().toUTCString();
    
        var lockdata = 0 ;
        db.collection("UsersLockMessage").doc(user.uid).set({
          lockData:lockdata,
          message: speakmessage,
        date : date
      })
      .then(() => {
          console.log("Document successfully written!");
          res.json("Message sent")

          setTimeout(function(){ 

            console.log("Message is going to be deleted in 20 sec")

            var msgRef = db.collection('UsersLockMessage').doc(user.uid);

            // Remove the 'capital' field from the document
             msgRef.update({
              lockData: firebase.firestore.FieldValue.delete(),
              date: firebase.firestore.FieldValue.delete(),
              message: firebase.firestore.FieldValue.delete()
            });

            console.log("Message is has been deleted")
           }, 30000);
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });







      } else {
        
      res.render("status",{  errors: { msg:"No user yet Login", color: "red" }})
      }
    });



            
    }

);

module.exports = router;
