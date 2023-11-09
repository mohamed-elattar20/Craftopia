
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {

  apiKey: "AIzaSyCerXBzIJ7f-LpfL3mz5GHDj_jolaZOc1o",
  authDomain: "craftopia-405b6.firebaseapp.com",
  projectId: "craftopia-405b6",
  storageBucket: "craftopia-405b6.appspot.com",
  messagingSenderId: "391694631914",
  appId: "1:391694631914:web:554214c0e8fc370528a893",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const productsCol = collection(db, "products");

export const storage = getStorage(app);

