import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import 'firebase/auth'

const app = 
    !firebase.apps.length ? 
        firebase.initializeApp({
            apiKey: "AIzaSyBWnCuos8vfV6zVd7OsW_G67ptJ3cnDPk8",
            authDomain: "pedidosnow-276a6.firebaseapp.com",
            projectId: "pedidosnow-276a6",
            storageBucket: "pedidosnow-276a6.appspot.com",
            messagingSenderId: "375156823201",
            appId: "1:375156823201:web:3dfe3586aed16a9d9ccce0"
        }) 
            : firebase.app(); 

export const storage = firebase.storage(); 
export const firestore = firebase.firestore();
export const auth = firebase.auth;

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default app;
