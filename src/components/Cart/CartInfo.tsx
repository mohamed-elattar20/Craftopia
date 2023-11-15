import { useForm, Controller, SubmitHandler } from "react-hook-form";
import egyptGovernoratesData from "../../pages/RegisterPage/RegisterSeller/governorates.json";
import Select from "react-select";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import {
  DocumentData,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, usersRef } from "../../firebase/firebase.config";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}
type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  governorate: { label: string; value: string };
  email: string;
};

export const CartInfo = ({ nextPage }: CartPurchasesProps) => {
  const [currentUser, setCurrentUser] = useState<DocumentData>({});
  const [userDocId, setUserDocId] = useState("");
  const governorates = egyptGovernoratesData.egyptGovernorates;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const modifyUser = async () => {
      await updateDoc(doc(db, "users", userDocId), {
        ...data,
        displayName: `${data.firstName} ${data.lastName}`,
      });
    };
    modifyUser();
  };

  // getting user data
  const userUid = auth.currentUser?.uid;
  const q = query(usersRef, where("uId", "==", userUid));
  useEffect(() => {
    const getUserInfo = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDocId((old) => doc.id);
        console.log(typeof doc.data());
        console.log(doc.data());
        setCurrentUser((current) => ({ ...doc.data() }));
        console.log(currentUser);
      });
      console.log(currentUser);
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        address: currentUser.address,
        governorate: currentUser.governorate,
        email: currentUser.email,
      });
    };
    getUserInfo();
  }, [userDocId]);

  return (
    <>
      <div className="container pt-3">
        <p className="text-center fs-5 pb-5">تفاصيل الفاتورة</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              <div className="form-text mb-2 ">الاسم الأول</div>
              <input
                id="firstName"
                defaultValue={currentUser.firstName}
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
              <div className="form-text mb-2">الاسم الأخير</div>
              <input
                id="lastName"
                defaultValue={currentUser.lastName}
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
              <div className="form-text mb-2"> البريد الالكتروني</div>

              <input
                defaultValue={currentUser.email}
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
              <div className="form-text mb-2">رقم الهاتف</div>
              <input
                id="phone"
                defaultValue={currentUser.phone}
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
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-text mb-2">المحافظة</div>
              {/* <Select options={governorates} /> */}
              <Controller
                defaultValue={currentUser.governorate}
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
            <div className="col-12 col-md-6 ">
              <div className="form-text mb-2">العنوان</div>
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
          </div>
          <div className="mx-auto text-center">
            <button type="submit" className="btn btn-primary mt-5">
              تقدم إلى الدفع
            </button>
            <button
              className="btn btn-danger mt-5 me-3"
              type="submit"
              onClick={() => nextPage(0)}
            >
              رجوع
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
