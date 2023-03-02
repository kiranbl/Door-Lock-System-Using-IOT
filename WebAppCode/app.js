
const express = require("express");

const ejs = require("ejs");
const config = require('./config');

const db = require('./db');
const app = express();
const firebase = require("firebase");


// messaging.getToken({vapidKey: "BLCUl4o2A4BdegSp-Vm3FBSy4zhSyGIWZAMN7qRJx_j0SA7rboZCHh4bcC4qqGFYOghNiZvk9EQbKKqrcZN-pco"});

global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
// app.use(express.static(__dirname +'/public'));
app.use(express.static("public"));



var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();



app.get("/", function(req, res) {
  
  res.render("signup");

});


app.use("/signin", require("./routes/signin"));
app.use("/signup", require("./routes/signup"));
app.use("/signOut", require("./routes/signOut"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/usersList", require("./routes/usersList"));
app.use("/doorlock", require("./routes/doorlock"));
app.use("/sendMessage", require("./routes/sendMessage"));

app.listen(config.PORT, function() {
  console.log("Server Successfully Running at Port  3000");
});



module.exports = app;
