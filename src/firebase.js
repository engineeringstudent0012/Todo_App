import firebase from 'firebase'


const  firebaseApp=firebase.initializeApp({
        apiKey: "AIzaSyAg8WnA3969HmkPbYD83jcp22F0JPDkT6k",
        authDomain: "todoapp-0012.firebaseapp.com",
        projectId: "todoapp-0012",
        storageBucket: "todoapp-0012.appspot.com",
        messagingSenderId: "229033099479",
        appId: "1:229033099479:web:2338aa0483eb482e7cf092",
        measurementId: "G-SYY9Q7NEJV"
})

const db = firebaseApp.firestore()

export default db