import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyB_3g-qD_Ox9Pocc__rSOTr-MYo4qY2WyI",
  authDomain: "mad-max-power.firebaseapp.com",
  databaseURL: "https://mad-max-power.firebaseio.com",
  projectId: "mad-max-power",
  storageBucket: "mad-max-power.appspot.com",
  messagingSenderId: "1057799181916"
};

const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export { fb, db };
