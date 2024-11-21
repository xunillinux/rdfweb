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
    const { subscribe, set, update } = writable<{ user: User | null, isLoading: boolean }>({ user: null, isLoading: true });
    return {
      subscribe,
      setLoading: (isLoading: boolean) => update((state) => ({ ...state, isLoading })),
      reset: () => set({ user: null, isLoading: true })
    }
  }

  const { subscribe, set, update } = writable<{ user: User | null, isLoading: boolean }>({ user: auth?.currentUser ?? null, isLoading: true }, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, isLoading: false });
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    setLoading: (isLoading: boolean) => update((state) => ({ ...state, isLoading })),
    reset: () => set({ user: null, isLoading: true })
  };
}

export const userData = userStore();
export { auth, db, getDocument };
