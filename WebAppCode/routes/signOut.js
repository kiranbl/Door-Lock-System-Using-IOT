


const express = require("express");
const app = express();

const firebase = require("firebase");
const ejs = require("ejs");

const { body, check, validationResult } = require("express-validator");


app.set("view engine", "ejs");

var router = express.Router();

router.get("/", function (req, res) {




});

router.post(
  "/",
  function (req, res) {
  
         
  firebase.auth().signOut().then(() => {
        res.redirect("/signin")
    
}).catch((error) => {
 
    
});

            
    }

);

module.exports = router;







