import { useForm, SubmitHandler } from "react-hook-form";
import "./userProfileAccount.css";
import { UserProfileTaps } from "../userProfileTaps/UserProfileTaps";
import { auth, db, usersRef } from "../../../firebase/firebase.config";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;

};

export const UserProfileAccount = () => {
  const [currentUser, setCurrentUser] = useState<DocumentData>({});
  const [userDocId, setUserDocId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const modifyUser = async () => {
      await updateDoc(doc(db, "users", userDocId), {...data, displayName: `${data.firstName} ${data.lastName}`});
    };
    modifyUser();
  };
  console.log(errors);

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
      });
      console.log(currentUser);
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        address: currentUser.address,

      });
    };
    getUserInfo();
  }, []);

  return (
    <div className="user-profile border py-5 px-2 px-sm-5 flex-grow-1 rounded-4">
      <UserProfileTaps />
      <h2 className="text-center my-4">بيانات الحساب</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label htmlFor="firstName" className="form-label">
            الاسم الأول
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            defaultValue={currentUser.firstName}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className=" text-danger">يجب ادخال الاسم الأول</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">
            الاسم الأخير
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            defaultValue={currentUser.lastName}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className=" text-danger">يجب ادخال الاسم الأخير</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="form-label">
            رقم الهاتف
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            defaultValue={currentUser.phone}
            {...register("phone", {
              required: "يجب ادخال رقم الهاتف",
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: "رقم تليفون غير صحيح",
              },
            })}
          ></input>
          {errors.phone && (
            <p className=" text-danger">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="address" className="form-label">
            العنوان
          </label>
          <input
            type="text"
            className="form-control "
            id="address"
            defaultValue={currentUser.address}
            {...register("address", { required: true })}
          ></input>
          {errors.address && <p className=" text-danger">يجب ادخال العنوان</p>}
        </div>
        <div className="">
          <button className="btn btn-secondary text-white px-4" type="submit">
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};
