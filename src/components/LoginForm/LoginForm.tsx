// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
//  CSS
import "./LoginForm.css";
// React Hook Form
//  React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
//  Firebase
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, firestore, usersCollRef } from "../../firebase/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDocs, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { RefObject, useRef, useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
// Types
type Inputs = {
  email: string;
  password: string;
};
const LoginForm = () => {
  //  Auth
  const navigate = useNavigate();
  const [userLogin] = useAuthState(auth);
  const { currentUser } = useContext(UserContext);

  // **************************************************

  // **************************************************
  // const [userToReset] = useCollection(listOfUsers);
  // console.log(userToReset);
  // const resetPasword = () => {
  //   let myQuery: any = query(
  //     usersCollRef,
  //     where("email", "==", resetPassByEmail)
  //   );
  //   getDocs(myQuery)
  //     .then((res) => {
  //       // console.log(`hello`, res.docs[0].data());
  //       sendPasswordResetEmail(auth, resetPassByEmail)
  //         .then(() => {
  //           // console.log(`Password reset email sent!`);
  //           setResetPassConfirm(`تم إرسال رابط تغيير كلمة السر بنجاح`);
  //           setResetPassErr("");
  //         })
  //         .catch((error) => {
  //           const errorMessage = error.message;
  //           setResetPassErr(errorMessage);
  //           console.log(errorMessage);
  //           setResetPassConfirm(``);
  //         });
  //     })
  //     .catch((err) => {
  //       setResetPassErr("برجاء إدخال البريد الالكتروني الصحيح");
  //     });
  // };
  // ******************************
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Submit *******************
  const [loadingSignin, setLoadingSignin] = useState<Boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoadingSignin(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // console.log(`logged in`, res);
        setFirebaseError("");

        if (currentUser) {
          navigate(`/`);
        }
      })
      .catch((err) => {
        setFirebaseError(err.message);
      })
      .finally(() => setLoadingSignin(false));
  };

  return (
    <>
      <div className="container margin-container  rounded-4 ">
        <div className="row justify-content-center">
          <h1 className="display-1 text-center mb-5 fw-bold">كرافتوبيا</h1>
          <div className="col-sm-12 col-md-8 col-lg-5">
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
                  autoComplete="off"
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
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  كلمة المرور
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "برجاء إدخال كلمة المرور ",
                    },
                    minLength: {
                      value: 6,
                      message: "كلمة المرور اقل من 6 حروف",
                    },
                  })}
                  placeholder="كلمة المرور"
                  type="password"
                  className={`form-control rounded-0 input-style mb-2 ${
                    errors.password?.message && "border-danger"
                  }`}
                  id="exampleInputPassword1"
                />
                {errors.password && (
                  <p className="text-danger fw-medium mt-2">
                    {errors.password.message}
                  </p>
                )}
                <Link to={`/login/reset-password`}>هل نسيت كلمة المرور ؟</Link>
                {/* **************************************************************** */}
              </div>
              {loadingSignin ? (
                <button
                  className="btn btn-secondary w-100"
                  type="button"
                  disabled
                >
                  <span role="status">جاري تسجيل الدخول</span>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                </button>
              ) : (
                <button type="submit" className="btn btn-secondary w-100">
                  تسجيل الدخول
                </button>
              )}

              {firebaseError ? (
                <p className="text-danger my-2">
                  يوجد خطأ في كلمة المرور او البريد الالكتروني
                </p>
              ) : (
                ""
              )}

              <div className="text-center">
                <p className=" mt-3 text-muted">جديد الى كرافتوبيا ؟</p>
                <NavLink
                  to={`/register`}
                  className="text-center text-decoration-none fw-bold text-secondary "
                >
                  انشاء حساب لك في كرافتوبيا
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
