const express = require("express");
const app = express();

const firebase = require("firebase");
require("firebase/firestore");


var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
const ejs = require("ejs");

const { body, check, validationResult } = require("express-validator");


app.set("view engine", "ejs");

var router = express.Router();

router.get("/", function (req, res) {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        
          var uid = user.uid;
          var email = user.email;

          // var docRef = db.collection("AuthorisedUser").doc(uid);
        //  var docRef_1 = docRef.listCollections();
    
        
        db.collection("AuthorisedUser").doc(uid).collection("users").get()
        .then(querySnapshot => {
          var userLists =[];
            querySnapshot.forEach(doc => {
          
                userLists.push(doc.data())
                // console.log(doc.id, " => ", doc.data().url);
            });
            
            res.render("usersList",{ users:userLists });
        });


    

          // res.render("usersList")
        } else {
            res.render("status",{  errors: { msg:"No user yet Login", color: "red" }})
        }
      });

 

// if (user) {
//     res.render("dashboard");

// } else {
//   console.log(error)
// }




});

router.post(
  "/",
  function (req, res) {
  
           
            
    }

);

module.exports = router;
