import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVrpobNVZT20BsUObICju784KVtG9r_TM",
  authDomain: "password-manager-hacktiv8.firebaseapp.com",
  databaseURL: "https://password-manager-hacktiv8.firebaseio.com",
  projectId: "password-manager-hacktiv8",
  storageBucket: "password-manager-hacktiv8.appspot.com",
  messagingSenderId: "251318913569",
  appId: "1:251318913569:web:34a594164b46c03c"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();