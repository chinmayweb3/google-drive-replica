import admin from "firebase-admin";

import firebaseKey from "./../../firebaseKey.json";

const firebase = admin.initializeApp({
  credential: admin.credential.cert(firebaseKey as admin.ServiceAccount),
});

const fireDB = firebase.firestore();
const fireAuth = firebase.auth();

export { fireAuth, fireDB };
