import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./firebase.config";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initalize the firebase app *******************
const app = initializeApp(firebaseConfig);

// Authentication ***************
export const auth = getAuth(app);

// FireStore *************
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Getting Collections From Firebase ****************
export const usersCollRef = collection(firestore, "users");

export const productsCollRef = collection(firestore, "products");

export const postsCollRef = collection(firestore, "posts");

export const commentsCollRef = collection(firestore, "comments");

export const contactUsCollRef = collection(firestore, "contactUs")