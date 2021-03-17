import firebase from "/firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDeNcW0QOKzjPcy2UUksc-ErVXBWz_oo3A",
  authDomain: "slack-be762.firebaseapp.com",
  projectId: "slack-be762",
  storageBucket: "slack-be762.appspot.com",
  messagingSenderId: "9032923400",
  appId: "1:9032923400:web:4c516b0c82c503226154bd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
