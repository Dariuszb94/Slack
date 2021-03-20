import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBOrGfPOGjPYr0_U7G5_NIMeRv-D4yC7EA",
  authDomain: "chatter-403a2.firebaseapp.com",
  projectId: "chatter-403a2",
  storageBucket: "chatter-403a2.appspot.com",
  messagingSenderId: "284181489680",
  appId: "1:284181489680:web:f460b8f092acb53143c295",
};
//const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
