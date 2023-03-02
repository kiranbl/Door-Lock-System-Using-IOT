const express = require("express");
const app = express();
const ejs = require("ejs");

const { body, check, validationResult } = require("express-validator");

app.set("view engine", "ejs");

var router = express.Router();
const firebase = require("firebase");
const fbase = require("firebase/storage")
 var storage = firebase.storage();
 var storageRef = storage.ref();


router.get("/", function (req, res) {
  res.render("signup");
});

router.post(
  "/",
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("ERROR");
    }
    return true;
  }),
  function (req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.render("status", {
        errors: {
          msg: "Entered passwords do not match each other!! Please Try Again",
          color: "red",
        },
      });
    } else {
   
      var email = req.body.email;
      var password =req.body.password;
      firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;

    var imagesRef = storageRef.child("../public/favicon/favicon-16x16.png");
    var spaceRef = storageRef.child('images/'+ user.uid +"/favicon-16x16.png");

    console.log(user)
    console.log(user.uid)
    // ...
  })
  .catch((error) => {
   
    res.render("status", {
      errors: {
        msg: error,
        color: "red",
      }});

  });
   
       
                }
        
      
    }
  
);

module.exports = router;
