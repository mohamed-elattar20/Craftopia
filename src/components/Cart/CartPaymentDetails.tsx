import { useForm } from "react-hook-form";
import './Cart.css'

const CartPaymentDetails = () => {

    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const onSubmit = (data: {}) => console.log(data);

    return (
        <div className="container pt-5">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            </form>
        </div>
    )
}

export default CartPaymentDetails;