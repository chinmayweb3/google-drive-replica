import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const configApp = {
  apiKey: import.meta.env.VITE_APIKEY,
  projectId: import.meta.env.VITE_PROJECTID,
  appId: import.meta.env.VITE_APPID,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  messagingSenderId: import.meta.env.VITE_MESSAGESENDERID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
};

const app = initializeApp(configApp);

const fireStorage = getStorage(app);
const fireAuth = getAuth(app);
const fireStore = getFirestore(app);

export { fireStorage, fireAuth, fireStore };
