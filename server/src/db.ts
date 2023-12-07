import firebase from "firebase/app";
import config from "./config";

const db = firebase.initializeApp(config.firebaseConfig);

export default db;