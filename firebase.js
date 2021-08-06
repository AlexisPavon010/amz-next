import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBE4qDWjD5UGKqWzMioeSlY_UmTdIJ3zPY",
    authDomain: "amz-nextjs.firebaseapp.com",
    projectId: "amz-nextjs",
    storageBucket: "amz-nextjs.appspot.com",
    messagingSenderId: "119254630703",
    appId: "1:119254630703:web:0f692051171bd0ec8ee1da"
  };


const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app()

const db = app.firestore()

export {db}