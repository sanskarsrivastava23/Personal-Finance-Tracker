import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC89z2YoNm7-UbkySOsGz2rWc1rcq-uwcg",
  authDomain: "finance-tracker-6d6c2.firebaseapp.com",
  projectId: "finance-tracker-6d6c2",
  storageBucket: "finance-tracker-6d6c2.appspot.com",
  messagingSenderId: "211355484797",
  appId: "1:211355484797:web:6b1fe5d61603e1e5af6714",
  measurementId: "G-GXVWJK1XL8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, db, doc, provider, setDoc };
