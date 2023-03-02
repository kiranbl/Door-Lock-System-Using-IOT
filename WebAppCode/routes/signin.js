const express = require("express");
const app = express();

const firebase = require("firebase");
const ejs = require("ejs");

const { body, check, validationResult } = require("express-validator");


app.set("view engine", "ejs");

var router = express.Router();

router.get("/", function (req, res) {
  res.render("signin");
});

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password ").notEmpty(),
  ],
  function (req, res) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const e = error.array();
      res.render("status", {
        errors: { msg: e[0].msg, color: "red" },
      });
    } else {
      const { email, password } = req.body;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    
    var user = userCredential.user;
    
    res.redirect('/dashboard')
  
  })
  .catch((error) => {
    if(error){
      console.log(error)
      res.render("status",{  errors: { msg:error.message, color: "red" }})
    }
  
    
  });
           
                    }
    }
  
);

module.exports = router;
