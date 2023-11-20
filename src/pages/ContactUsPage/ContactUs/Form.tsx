import "./ContactUs.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { contactUsCollRef } from "../../../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};
const Form = () => {
  const notify = () =>
    toast.success("تم إرسال رسالتك بنجاح", {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      pauseOnHover: false,
      rtl: true,
    });

  const { currentUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();

  const [loading, setLoading] = useState<Boolean>(false);
  const submitControl = (data: any) => {
    setLoading(true);
    // console.log(data);
    const feedbackId = crypto.randomUUID();
    setDoc(doc(contactUsCollRef, feedbackId), {
      ...data,
      feedbackId,
      sentAt: Timestamp.now(),
    })
      .then(() => {
        // console.log(`message sent successfully`);
        setLoading(false);
        notify();
        reset();
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    reset({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      email: currentUser?.email,
      message: "",
    });
  }, [currentUser]);
  return (
    <div className="col-12 col-md-8">
      <ToastContainer
        autoClose={500}
        closeOnClick
        rtl={true}
        theme="light"
        hideProgressBar
      />
      <form onSubmit={handleSubmit(submitControl)}>
        <div className="row mb-0 mb-md-4">
          <div className="col-12 col-md-6">
            <label htmlFor="firstName" className="mb-2">
              الاسم الأول
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0 "
              placeholder="First name"
              id="firstName"
              {...register("firstName", {
                required: "برجاء ادخال الاسم الاول",
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="firstName" />
            </small>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="lastName" className="mb-2">
              الاسم الأخير
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="Last name"
              id="lastName"
              {...register("lastName", {
                required: "برجاء ادخال الاسم الاخير",
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="lastName" />
            </small>
          </div>
        </div>
        <div className="row mb-0 mb-md-4">
          <div className="col-12 col-md-6">
            <label htmlFor="phone" className="mb-2">
              رقم الهاتف
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="+2 012 3456 789"
              {...register("phone", {
                required: "برجاء ادخال رقم الهاتف",
                pattern: {
                  value: /^01[0-2,5]{1}[0-9]{8}$/,
                  message: "Please Enter a Valid Phone Number",
                },
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="phone" />
            </small>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="email" className="mb-2">
              الايميل
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="example@gmail.com"
              id="email"
              {...register("email", {
                required: "برجاء ادخال الايميل",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Please Enter a Valid Email",
                },
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="email" />
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="message" className="mb-3">
              اترك تعليق
            </label>
            <textarea
              className="form-control mb-3"
              placeholder="اكتب رسالتك..."
              id="message"
              {...register("message", { required: "من فضلك اترك رسالتك" })}
            ></textarea>
            <small className="text-danger mb-2">
              <ErrorMessage errors={errors} name="message" />
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          {loading ? (
            <button className="btn btn-secondary mt-2" type="button" disabled>
              <span className="ms-2" role="status">
                جاري الإرسال
              </span>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-secondary fw-bold px-4 py-2 mt-2"
            >
              إرسال
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
