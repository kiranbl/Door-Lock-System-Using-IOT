const express = require("express");
const app = express();

const firebase = require("firebase");
var database = firebase.database();
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

    // function writeUserDataWithCompletion(userId, lockdata) {
    //   var date = new Date().toUTCString();
    //   console.log(date)
    
    //   firebase.database().ref('users/' + userId +'/lockStatus').set({
    //     lockData: lockdata,
    //     date : date
    //   }, (error) => {
    //     if (error) {
    //       res.json(error)
    //     } else {
    //       res.json("data saved")
    //     }
    //   });
      // [END rtdb_write_new_user_completion]
    // }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        var email = user.email;
      
        if(req.body.opendoordata === "yes")
        var lockdata = 1 ;
        var date = new Date().toUTCString();
     
        var speakmessage = req.body.message ;
        // writeUserDataWithCompletion(user.uid,lockdata);

        db.collection("UsersLockMessage").doc(user.uid).set({
          message: speakmessage,
          lockData: lockdata,
          date : date
      })
      .then(() => {
          console.log("Document successfully written!");
          res.json("Door Opened")

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
           }, 20000);
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });






      } else {
        console.log(new Date)
      res.render("status",{  errors: { msg:"No user yet Login", color: "red" }})
      }
    });



         
    }

);

module.exports = router;
