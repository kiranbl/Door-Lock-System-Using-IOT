
// const firebase = require("firebase");

// require("firebase/firestore");

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


  


var db = firebase.firestore();





db.collection("UserUnknownPhoto").doc("")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    });