import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import config from "./config.js";

const app = firebase.initializeApp(config.firebaseConfig);

const db = app.firestore();

export default db;