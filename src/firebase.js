import firebase from "firebase"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnAe5vvcQjBGWDWbAl8QhL4kcUoAtR3Ps",
  authDomain: "bt3103-week-6-44edd.firebaseapp.com",
  projectId: "bt3103-week-6-44edd",
  storageBucket: "bt3103-week-6-44edd.appspot.com",
  messagingSenderId: "293906314436",
  appId: "1:293906314436:web:65fb854d80c7c082258591",
  measurementId: "G-P62NP6M48N"

};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;