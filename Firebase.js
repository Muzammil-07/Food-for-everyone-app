import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'


const config = {
    apiKey: "AIzaSyAkJZw16QC-IAoLaSnaUnUIIOyXOf0o7OE",
    authDomain: "factory-3e7d4.firebaseapp.com",
    projectId: "factory-3e7d4",
    storageBucket: "factory-3e7d4.appspot.com",
    messagingSenderId: "574922531897",
    appId: "1:574922531897:web:c5669ff6d1bd5e5eb0d9e8"
  };
  const Firebase = firebase.initializeApp(config);

  export default Firebase;