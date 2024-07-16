import { initializeApp } from "firebase/app";
import fireStorage from "firebase/storage";
import fireAuth from "firebase/auth";
import fireStore from "firebase/firestore";

const configApp = {
  apiKey: process.env.APIKEY,
  projectId: process.env.PROJECTID,
  appId: process.env.APPID,
  authDomain: process.env.AUTHDOMAIN,
  messagingSenderId: process.env.MESSAGESENDERID,
  storageBucket: process.env.STORAGEBUCKET,
};

const app = initializeApp(configApp);

fireStorage.getStorage(app);
fireAuth.getAuth(app);
fireStore.getFirestore(app);

export { fireStorage, fireAuth, fireStore };
