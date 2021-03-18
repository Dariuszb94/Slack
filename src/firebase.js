import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDeNcW0QOKzjPcy2UUksc-ErVXBWz_oo3A",
  authDomain: "slack-be762.firebaseapp.com",
  projectId: "slack-be762",
  storageBucket: "slack-be762.appspot.com",
  messagingSenderId: "9032923400",
  appId: "1:9032923400:web:90d053abcdf148396154bd",
};
//const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
