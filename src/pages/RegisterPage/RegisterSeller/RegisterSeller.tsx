//  Types
// import { RegisterData } from "../../../Types/RegisterUserType";
//  Json
import egyptGovernoratesData from "./governorates.json";
//  React Hook Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// React Select
import Select from "react-select";
//  CSS
import "react-phone-number-input/style.css";
//  Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
//  Firebase
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { auth, usersCollRef } from "../../../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
function RegisterSeller() {
  const governorates = egyptGovernoratesData.egyptGovernorates;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  // Authentication *******************

  const [myUser] = useAuthState(auth);
  const [NavigationState, setNavigationState] = useState<
    User | null | undefined
  >();
  useEffect(() => {
    setNavigationState(myUser);
  }, [myUser]);
  // console.log(myUser);
  const [users] = useCollection(usersCollRef);
  //
  const navigate = useNavigate();
  //

  //
  const onSubmit = (data: any) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // console.log(res);
        // console.log(`added to auth users`, res);
        // setName(res?.user?.displayName);
        // ***************
        // updateProfile(res.user, {
        //   displayName: `${data.firstName} ${data.lastName}`,
        // });
        // *****************
        addDoc(usersCollRef, {
          ...data,
          uId: res.user.uid,
          displayName: `${data.firstName} ${data.lastName}`,
          Rule: "seller",
          orders: [{}],
        })
          .then(() => {
            // console.log(`user Added to fire Store`);
          })
          .catch((err) => {
            console.log(err);
          });
        navigate(`/seller/profile`);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  // Authentication *******************

  return (
    <>
      <div className="container">
        <h1 className="text-center pt-5  fw-bold">إنشاء حساب</h1>
        <p className="text-center fs-5 pb-5">
          نحن بحاجة لمساعدتك في تقديم بعض المعلومات الأساسية لإنشاء حسابك
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              <div className="form-text ">الاسم الأول</div>

              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="الاسم الأول"
                aria-describedby="الاسم الاول"
                {...register("firstName", { required: true })}
              />
              {errors.firstName ? (
                <div id="emailHelp" className="form-text text-danger">
                  برجاء ادخال الاسم الأول
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="form-text ">الاسم الأخير</div>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="الاسم الأخير"
                aria-describedby="الاسم الاخير"
                {...register("lastName", { required: true })}
              />
              {errors.lastName ? (
                <div id="emailHelp" className="form-text text-danger">
                  برجاء ادخال الاسم الأخير
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              <div className="form-text ">عنوان البريد الالكتروني</div>

              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Email address"
                aria-describedby="البريد الالكتروني"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال عنوان البريد الالكتروني
                </div>
              ) : null}
              {errors.email?.type === "pattern" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال عنوان بريد الكتروني صحيح
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6 pb-3">
              <div className="form-text ">اسم العلامة التجارية</div>
              <input
                id="brand"
                type="text"
                className="form-control"
                placeholder=" العلامة التجارية  "
                aria-describedby="العلامة التجارية"
                {...register("brand", { required: true })}
              />
              {errors.brand?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال العلامة التجارية
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              <div className="form-text ">رقم الهاتف</div>
              <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="  رقم الهاتف "
                aria-describedby="رقم الهاتف "
                {...register("phone", {
                  required: true,
                  pattern: /^01[0125][0-9]{8}$/,
                })}
              />
              {errors.phone?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال رقم الهاتف
                </div>
              ) : null}
              {errors.phone?.type === "pattern" ? (
                <div className="form-text  text-danger">رقم هاتف غير صحيح</div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="form-text ">المحافظة</div>
              {/* <Select options={governorates} /> */}
              <Controller
                name="governorate"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={governorates} />
                )}
              />
              {errors.governorate?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء اختيار المحافظة{" "}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="form-text ">المدينة</div>
              <input
                type="text"
                className="form-control"
                id="city"
                aria-describedby="cityHelp"
                placeholder="المدينة"
                {...register("city", { required: true })}
              />
              {errors.city?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال المدينة{" "}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="form-text ">العنوان</div>
              <input
                type="text"
                className="form-control"
                id="address"
                aria-describedby="addressHelp"
                placeholder="العنوان"
                {...register("address", { required: true })}
              />
              {errors.address?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال العنوان{" "}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6 pt-3">
              <div className="form-text ">كلمة السر</div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="كلمة السر"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
              />
              {errors.password?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال كلمة السر{" "}
                </div>
              ) : null}
              {errors.password?.type === "pattern" ? (
                <div className="form-text  text-danger">
                  "يجب أن تحتوي كلمة المرور على الأقل حرف أبجدي واحد، رقم واحد،
                  وحرف خاص واحد، وأن تكون على الأقل 8 أحرف في الطول."
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6 pt-3">
              <div className="form-text ">تأكيد كلمة السر</div>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="تأكيد كلمة السر"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return false;
                    }
                  },
                })}
              />
              {errors.confirmPassword?.type === "required" ? (
                <div className="form-text  text-danger">
                  برجاء ادخال تأكيد كلمة السر{" "}
                </div>
              ) : null}
              {errors.confirmPassword?.type === "validate" ? (
                <div className="form-text  text-danger">
                  كلمة السر غير متوافقة
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary mt-5">
              تسجيل
            </button>
            <Link to={`/register`} className="btn btn-primary mt-5 me-2">
              العوده
            </Link>
          </div>
          <NavLink
            to={`/login`}
            className="text-primary d-block my-2 text-decoration-none"
          >
            هل أنت عضو بالفعل؟
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default RegisterSeller;
