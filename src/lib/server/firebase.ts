import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "Firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDEx7y5fiRbSxJE70d78MEbUkvZidP9dJQ",
  authDomain: "rdfweb-16f10.firebaseapp.com",
  projectId: "rdfweb-16f10",
  storageBucket: "rdfweb-16f10.firebasestorage.app",
  messagingSenderId: "927492596380",
  appId: "1:927492596380:web:cb9c7210f26d4fcc6e0359",
  measurementId: "G-4C2ZM1VNPT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const userDoc = (userId: string) => doc(db, "users", userId)
export {
  auth
};

const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};


export { db, getDocument };
