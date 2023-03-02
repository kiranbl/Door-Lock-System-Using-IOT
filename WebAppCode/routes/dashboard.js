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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        
          var uid = user.uid;
          var email = user.email;

          // db.collection("UserUnknownPhoto").doc(uid)
          // .onSnapshot((doc) => {
          //   var x = doc.data()
          //   if(!Object.keys(x).length === 0){
          //    console.log("new data")
          //     res.render("dashboard",{unknown:doc.data()})
          //   }
          //   else
          //   {
          //     var curDate = Date.now()
          //     console.log(curDate)
          //     var unknowns = {
          //       url:"https://via.placeholder.com/150/54E346/000000?Text=WebsiteBuilders.com" ,
          //        message:"No One At The Door",
          //        date:curDate
          //       }
         
          //     res.render("dashboard",{unknown:unknowns});

          //   }
          
          //   //  console.log("Current data: ", doc.data());
          // });
      
          res.render("dashboard");

        } 
        
        else {
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
