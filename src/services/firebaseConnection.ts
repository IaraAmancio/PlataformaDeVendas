
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyApLPE4HUB0g2sM_iB-c7vnMCft81ZUIfw",
  authDomain: "webcarros-d8423.firebaseapp.com",
  projectId: "webcarros-d8423",
  storageBucket: "webcarros-d8423.firebasestorage.app",
  messagingSenderId: "339062469364",
  appId: "1:339062469364:web:b4ebad06942e97796964a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};
