import firebase from 'firebase';

    firebase.initializeApp({
      apiKey: "AIzaSyAvHWpzDxlXLWVjmtfNM-ebnVyKUYW-h5U",
      authDomain: "saturn-d573e.firebaseapp.com",
      databaseURL: "https://saturn-d573e.firebaseio.com",
      projectId: "saturn-d573e",
      storageBucket: "saturn-d573e.appspot.com",
      messagingSenderId: "281989502039",
      appId: "1:281989502039:web:9dde5db355c02fd14aff12",
      measurementId: "G-W8S9N3VRV1"
    });

    const db = firebase.firestore();

    

    firebase.analytics();

   
    export default db;