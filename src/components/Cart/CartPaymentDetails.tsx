import { useForm } from "react-hook-form";
import "./Cart.css";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import {
  authReq,
  orderReg,
  paymentReq,
} from "../../Hooks/PaymobHook/usePaymob";
import { Timestamp, addDoc, updateDoc } from "firebase/firestore";
import { ordersRef } from "../../firebase/firebase.config";
const CartPaymentDetails = () => {
  const [iframeURL, setIframeURL] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authUser, userRef } = useContext(UserContext);
  let total = 0;
  let bankCard = false;

  const shippingPrice = 60;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartKeys.forEach((key, index) => {
      total +=
        authUser[0]?.cart[key].productPrice * authUser[0]?.cart[key].quantity;
    });
  }
  const makeCartEmpty = async () => {
    if (userRef) {
      await updateDoc(userRef, {
        ["cart"]: {},
      }).then(() => {
        console.log("cart has been emptied");
      });
    }
  };

  useEffect(() => {
    let tok: any;
    let orderId;
    authReq().then((data) => {
      tok = data;
      if (authUser) {
        orderReg(authUser, tok).then((res: any) => {
          console.log(res);
          orderId = res.id;
          console.log(orderId);
          paymentReq(authUser, tok, orderId).then((res) => {
            setIframeURL(
              (old) =>
                `https://accept.paymob.com/api/acceptance/iframes/802610?payment_token=${res}`
            );
          });
        });
      }
    });

    const handleBeforeUnload = async () => {
      await makeCartEmpty();
      if (authUser) {
        const orderId = crypto.randomUUID();
        await addDoc(ordersRef, {
          orderId,
          clientId: authUser[0]["uId"],
          clientName: authUser[0]["displayName"],
          governorate: authUser[0]["governorate"],
          orderAt: Timestamp.fromDate(new Date()),
          price: total,
          products: authUser[0]["cart"],
          shippingPrice: shippingPrice,
          totalPrice: total + shippingPrice,
          address: authUser[0]["address"],
          status: "pending",
          paymentMethod: !bankCard ? "On Delivery" : "Card Payment",
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [authUser]);

  return (
    <div className="container pt-5 h-100">
      <iframe
        src={iframeURL}
        style={{ width: "100%", height: "800px" }}
      ></iframe>
    </div>
  );
};

export default CartPaymentDetails;
