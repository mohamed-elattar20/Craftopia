import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./firebase.config"
import { collection, getFirestore } from "firebase/firestore"
// 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initalize the firebase app *******************
const app = initializeApp(firebaseConfig);

// Authentication ***************
export const auth = getAuth(app)

// FireStore *************
export const firestore = getFirestore(app);

// Getting Collections From Firebase ****************
export const usersCollRef = collection(firestore, "users");

export const productsCollRef = collection(firestore, "products")