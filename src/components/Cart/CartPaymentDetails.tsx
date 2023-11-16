import { useForm } from "react-hook-form";
import { useStripe } from '@stripe/react-stripe-js';
import './Cart.css'
import { db, ordersRef } from "../../firebase/firebase.config";
import { addDoc, collection, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { submitOrder } from "../../Hooks/StripeHook/useStripe";

const CartPaymentDetails = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
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
    // handleSubmit(() => submitOrder)
    const ayhaha = () => {
        if(authUser){
            submitOrder(authUser, ordersRef, total, shippingPrice);
        }
    }

    return (
        <div className="container pt-5">
            <form onSubmit={handleSubmit(ayhaha)} noValidate>
                <div className="row g-4">
                    <div className="col-12 col-md-6 pb-3">
                        <h6 className="d-flex justify-content-between p-1">
                            <span>رقم البطاقة البنكية</span>
                            <span>Card Number</span>
                        </h6>
                        <input
                            id="CardNumber"
                            type="text"
                            className="form-control"
                            placeholder="رقم البطاقة البنكية"
                            {...register("CardNumber", { required: true })}
                        />
                        {errors.CardNumber &&
                            <p className=" text-danger">برجاء ادخال رقم البطاقة</p>
                        }
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <h6 className="d-flex justify-content-between p-1">
                            <span>اسم حامل البطاقة</span>
                            <span>Cardholder Name</span>
                        </h6>
                        <input
                            id="CardHolder"
                            type="text"
                            className="form-control"
                            placeholder="رقم البطاقة البنكية"
                            {...register("CardHolder", { required: true })}
                        />
                        {errors.CardHolder &&
                            <p className=" text-danger">برجاء ادخال الاسم</p>
                        }
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <h6 className="d-flex justify-content-between p-1">
                            <span>تاريخ الانتهاء</span>
                            <span>Expirey Date</span>
                        </h6>
                        <input
                            id="ExpireyDate"
                            type="text"
                            className="form-control"
                            placeholder="تاريخ الانتهاء"
                            {...register("ExpireyDate", { required: true })}
                        />
                        {errors.ExpireyDate &&
                            <p className=" text-danger">برجاء ادخال تاريخ الانتهاء</p>
                        }
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <h6 className="d-flex justify-content-between p-1">
                            <span>الرقم السرى</span>
                            <span>CCV</span>
                        </h6>
                        <input
                            id="Ccv"
                            type="text"
                            className="form-control"
                            placeholder="رقم البطاقة البنكية"
                            {...register("Ccv", { required: true })}
                        />
                        {errors.Ccv &&
                            <p className=" text-danger">برجاء ادخال الرقم السرى</p>
                        }
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-5" onClick={() => ayhaha()}>اتمام عملية الدفع</button>
            </form>
        </div>
    )
}

export default CartPaymentDetails;