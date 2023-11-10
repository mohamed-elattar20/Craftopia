// Routing
import { NavLink, useNavigate } from "react-router-dom";
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
//  Firebase
import { auth, firestore, usersCollRef } from "../../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
type Inputs = {
  email: string;
  password: string;
};
const ResetPassword = () => {
  // ****************************************************
  //   How To update the Document after resting Password ?????????????????????
  // ****************************************************
  //  Auth
  const navigate = useNavigate();
  const [resetPassByEmail, setResetPassByEmail] = useState<string>("");
  const [resetPassErr, setResetPassErr] = useState<string>("");
  const [resetPassConfirm, setResetPassConfirm] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let myQuery: any = query(usersCollRef, where("email", "==", data.email));
    getDocs(myQuery)
      .then((res) => {
        console.log(`hello`, res.docs[0].data());
        sendPasswordResetEmail(auth, data.email)
          .then((res) => {
            console.log(res);

            setResetPassConfirm(`تم إرسال رابط تغيير كلمة السر بنجاح`);
            setResetPassErr("");
            // navigate(`/login`);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setResetPassErr(errorMessage);
            console.log(errorMessage);
            setResetPassConfirm(``);
            setResetPassErr("برجاء إدخال البريد الالكتروني الصحيح");
          });
      })
      .catch((err) => {
        setResetPassErr("برجاء إدخال البريد الالكتروني الصحيح");
      });
  };
  return (
    <>
      <div className="container margin-container  rounded-4 ">
        <div className="row justify-content-center">
          <h1 className="display-1 text-center mb-5 fw-bold">كرافتوبيا</h1>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                {/* Email */}
                <label htmlFor="exampleInputEmail1" className="form-label">
                  عنوان البريد الالكتروني
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "برجاء إدخال البريد الالكتروني",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
                      message: "يجب ان يكون البريد الالكتروني مثل m@m.com",
                    },
                  })}
                  placeholder="عنوان البريد الالكتروني"
                  type="email"
                  className={`form-control rounded-0 input-style ${
                    errors.email?.message && "border-danger"
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {errors.email && (
                  <p className="text-danger fw-medium mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <button type="submit" className="btn btn-primary ms-3">
                  إرسال رابط التفعيل
                </button>
                <NavLink
                  to={`/login`}
                  className="text-center text-decoration-none  text-light btn btn-success my-4"
                >
                  العوده لصفحة تسجيل الدخول
                </NavLink>
              </div>
              <div className="my-3">
                {resetPassConfirm && !resetPassErr ? (
                  <p className="text-primary fw-bold mt-2">
                    {resetPassConfirm}
                  </p>
                ) : (
                  ""
                )}
                {resetPassErr && (
                  <p className="text-danger fw-bold mt-2">{resetPassErr}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
