
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  const firebaseApp=firebase.initializeApp({
      apiKey: "AIzaSyC4IQ4-Zh_L8iWxIvVtX46DvEP9yrT_7sA",
    authDomain: "instagram-clone-5b018.firebaseapp.com",
    projectId: "instagram-clone-5b018",
    storageBucket: "instagram-clone-5b018.appspot.com",
    messagingSenderId: "589819118722",
    appId: "1:589819118722:web:f0eb8de9175dc1af31209b",
    measurementId: "G-VYDBY6DYLL"
  });


   const db=firebaseApp.firestore();
   const auth = firebase.auth();
  //  const storage = firebase.storage();

   export{db,auth};

   //export default db;