import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { PUBLIC_FB_API_KEY, PUBLIC_FB_AUTH_DOMAIN, PUBLIC_FB_PROJECT_ID, PUBLIC_FB_STORAGE_BUCKET, PUBLIC_FB_MESSAGING_SENDER_ID, PUBLIC_FB_APP_ID, PUBLIC_FB_MEASUREMENT_ID } from "$env/static/public";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: PUBLIC_FB_API_KEY,
  authDomain: PUBLIC_FB_AUTH_DOMAIN,
  projectId: PUBLIC_FB_PROJECT_ID,
  storageBucket: PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: PUBLIC_FB_APP_ID,
  measurementId: PUBLIC_FB_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

export { auth, db, getDocument };
