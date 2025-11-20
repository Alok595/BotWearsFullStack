import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "wallpaperbot-b35ae.firebaseapp.com",
  projectId: "wallpaperbot-b35ae",
  storageBucket: "wallpaperbot-b35ae.firebasestorage.app",
  messagingSenderId: "106101380767",
  appId: "1:106101380767:web:201cea9b7c49d691aef4aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
