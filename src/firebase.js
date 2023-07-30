import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {


    apiKey: "AIzaSyBB82MW9ltnR4-nwVbiBSryoYxEDx_PMSs",


    authDomain: "herald-result-app.firebaseapp.com",


    databaseURL: "https://herald-result-app-default-rtdb.firebaseio.com",


    projectId: "herald-result-app",


    storageBucket: "herald-result-app.appspot.com",


    messagingSenderId: "902637284148",


    appId: "1:902637284148:web:8d451113d7a0a481e01361",


    measurementId: "G-9KYW17K3RS"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const databaser = getDatabase(app);
