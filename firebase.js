import firebase from 'firebase'


const firebaseConfig = {
    apiKey: process.env.FIREBASE_PUBLIC_APIKEY,
    authDomain: process.env.FIREBASE_PUBLIC_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PUBLIC_PROJECTID,
    storageBucket: process.env.FIREBASE_PUBLIC_PROJECTID,
    messagingSenderId: process.env.FIREBASE_PUBLIC_MESSAGING,
    appId: process.env.FIREBASE_PUBLIC_APPID
  };


const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app()

const db = app.firestore()

export {db}