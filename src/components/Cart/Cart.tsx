import Navbar from "../Navbar/Navbar";
import { CartStepper } from "./CartStepper";
import { CartPurchases } from "./CartPurchases";
import { useEffect, useState } from "react";
import { CartInfo } from "./CartInfo";
import { auth, db, usersRef } from "../../firebase/firebase.config";
import {
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import CartPayment from "./CartPayment";

function Cart() {
  const [stepperValue, setStepperValue] = useState(0);
  const [currentUserData, setCurrentUserData] = useState<DocumentData>({});
  const [user, setUser] = useState<User>();
  return (
    <>
      <CartStepper stepUpdate={stepperValue} />
      {stepperValue === 0 && <CartPurchases nextPage={setStepperValue} />}
      {stepperValue === 1 && <CartInfo nextPage={setStepperValue} />}
      {stepperValue === 2 && <CartPayment nextPage={setStepperValue} />}
    </>
  );
}
export default Cart;

// useEffect(() => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setUser((old) => user);
//       const uid = user.uid;
//       const q = query(usersRef, where("uId", "==", uid));
//       const getUserInfo = () => {
//         const unsub = onSnapshot(q, (querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             console.log(typeof doc.data());
//             console.log(doc.data());
//             setCurrentUserData((current) => ({ ...doc.data() }));
//             console.log(currentUserData);
//           });
//         });
//       };
//       getUserInfo();
//     }
//   });
// });
