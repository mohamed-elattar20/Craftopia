import Navbar from "../Navbar/Navbar";
import { CartStepper } from "./CartStepper";
import { CartPurchases } from "./CartPurchases";
import { useState } from "react";
import { CartInfo } from "./CartInfo";
import CartPayment from "./CartPayment";

function Cart() {
  const [stepperValue, setStepperValue] = useState(2);
  return (
    <>
      <CartStepper stepUpdate={stepperValue} />
      {stepperValue === 0 && <CartPurchases nextPage={setStepperValue} />}
      {stepperValue === 1 && <CartInfo nextPage={setStepperValue} />}
      {stepperValue === 2 && <CartPayment nextPage={setStepperValue}/>}
    </>
  );
}

export default Cart;
