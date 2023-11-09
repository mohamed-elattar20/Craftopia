import Navbar from "../Navbar/Navbar";
import { CartStepper } from "./CartStepper";
import { CartPurchases } from "./CartPurchases";
import { useState } from "react";
import { CartInfo } from "./CartInfo";

function Cart() {
  const [stepperValue, setStepperValue] = useState(0);
  return (
    <>
      <Navbar />
      <CartStepper stepUpdate={stepperValue} />
      {stepperValue === 0 && <CartPurchases nextPage={setStepperValue} />}
      {stepperValue === 1 && <CartInfo nextPage={setStepperValue} />}
      {}
    </>
  );
}

export default Cart;
