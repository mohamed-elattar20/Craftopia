import Visa from "../../assets/images/Cart Payment/Visa.png";
import MasterCard from "../../assets/images/Cart Payment/MasterCard.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartPaymentDetails from "./CartPaymentDetails";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ordersRef } from "../../firebase/firebase.config";
import { setDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

interface CartPageProps {
  nextPage: (value: number) => void;
}

const CartPayment = ({ nextPage }: CartPageProps) => {
  const { authUser, userRef } = useContext(UserContext);
  let [bankCard, setBankCard] = useState(false);
  const [loading, setLoading] = useState(false);

  let total: number = 0;
  const shippingPrice = 60;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartKeys.forEach((key, index) => {
      total +=
        authUser[0]?.cart[key].productPrice * authUser[0]?.cart[key].quantity;
    });
  }
  const navigate = useNavigate();
  const submitOrder = async () => {
    if (authUser) {
      setLoading(true);
      const orderId = crypto.randomUUID();
      await setDoc(doc(firestore, "orders", orderId), {
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
      }).then(async () => {
        if (userRef) {
          await updateDoc(userRef, {
            ["cart"]: {},
          })
            .then(() => {
              console.log("cart has been emptied");
            })
            .finally(() => {
              setLoading(false);
              navigate("/cart/order");
            });
        }
      });
    }
  };

  const radioBoxSelected = (event: any) => {
    setBankCard((prev) => !!event.target.value);
  };

  return (
    <div className="container mx-auto py-5">
      <h2 className="pb-3 fs-1">وسائل الدفع :</h2>
      <div className="d-flex flex-column gap-2">
        <div
          className="option-one px-5 py-4 rounded d-flex flex-column gap-2"
          style={{ background: "rgba(0, 0, 0, 0.15)" }}
        >
          <div className="form-check d-flex align-items-baseline gap-5">
            <label
              className="form-check-label order-1"
              htmlFor="flexRadioDefault1"
            >
              <h3 className="fw-normal">الدفع عند الاستلام</h3>
            </label>
            <input
              type="radio"
              name="collapseGroup"
              id="flexRadioDefault1"
              value={""}
              onChange={(e) => radioBoxSelected(e)}
              style={{ color: "none" }}
              defaultChecked
            />
          </div>
          <h3 className="fw-normal text-black-50">
            بامكانك الدفع لمندوبنا عند استلامك الطلب
          </h3>
        </div>
        <div
          className="option-one px-5 py-4 rounded d-flex flex-row align-items-center gap-2"
          style={{ background: "rgba(0, 0, 0, 0.15)" }}
        >
          <div className="form-check d-flex align-items-baseline gap-5">
            <label
              className="form-check-label order-1"
              htmlFor="flexRadioDefault2"
            >
              <h3 className="fw-normal">الدفع بالبطاقة البنكية</h3>
            </label>
            <input
              type="radio"
              name="collapseGroup"
              id="flexRadioDefault2"
              value={"true"}
              onChange={(e) => radioBoxSelected(e)}
              style={{ color: "none" }}
            />
          </div>
          <div className="d-flex gap-4">
            <img src={Visa} alt="" style={{ width: "fit-content" }} />
            <img src={MasterCard} alt="" style={{ width: "fit-content" }} />
          </div>
        </div>
      </div>
      {bankCard && <CartPaymentDetails />}
      <div className="mx-auto text-center">
        {!bankCard &&
          (loading ? (
            <button className="btn btn-secondary mt-5" type="button" disabled>
              <span role="status">جاري تأكيد الطلب</span>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-secondary mt-5"
              onClick={submitOrder}
            >
              اتمام الطلب
            </button>
          ))}
        <button
          className="btn btn-danger mt-5 me-3"
          type="submit"
          onClick={() => nextPage(1)}
        >
          رجوع
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
