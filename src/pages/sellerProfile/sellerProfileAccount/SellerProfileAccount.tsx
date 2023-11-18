import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import egyptGovernoratesData from "../../RegisterPage/RegisterSeller/governorates.json";
import { doc, updateDoc } from "firebase/firestore";
import Select from "react-select";
import { UserContext } from "../../../Contexts/UserContext";
import { firestore } from "../../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  displayName: string;
  governorate: { label: string; value: string };
};

export const SellerProfileAccount = () => {
  //
  const notify = () =>
    toast.success("تم تعديل البيانات بنجاح", {
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
  //
  const governoratesList = egyptGovernoratesData.egyptGovernorates;
  const { currentUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();

  const [loading, setLoading] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const modifyUser = async () => {
      await updateDoc(doc(firestore, "users", currentUser?.uId), {
        ...currentUser,
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      });
      notify();
      setLoading(false);
    };
    modifyUser();
  };
  console.log(errors);

  useEffect(() => {
    reset({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      address: currentUser?.address,
      displayName: currentUser?.displayName,
      governorate: currentUser?.governorate,
    });
  }, [currentUser]);

  return (
    <div className="user-profile border py-5 px-2 px-sm-5 flex-grow-1 rounded-4">
      <ToastContainer
        autoClose={500}
        closeOnClick
        rtl={true}
        theme="light"
        hideProgressBar
      />
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
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className=" text-danger">برجاء ادخال الاسم الأول</p>
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
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className=" text-danger">برجاء ادخال الاسم الأخير</p>
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
            {...register("phone", {
              required: "برجاء ادخال رقم الهاتف",
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: "رقم الهاتف غير صحيح",
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
            {...register("address", { required: true })}
          ></input>
          {errors.address && (
            <p className=" text-danger">برجاء ادخال العنوان</p>
          )}
        </div>
        <div className="col-12">
          <div className="form-text ">المحافظة</div>
          <Controller
            name="governorate"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Select {...field} options={governoratesList} />
            )}
          />
          {errors.governorate?.type === "required" ? (
            <div className="form-text  text-danger">برجاء اختيار المحافظة </div>
          ) : null}
        </div>
        <div>
          <label htmlFor="displayName" className="form-label">
            اسم العلامة التجارية
          </label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <p className=" text-danger">برجاء ادخال العلامة التجارية</p>
          )}
        </div>
        <div className="">
          {/*  */}
          {loading ? (
            <button
              className="btn btn-secondary text-light"
              type="button"
              disabled
            >
              <span role="status">جاري التحميل</span>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button className="btn btn-secondary text-white px-4" type="submit">
              حفظ
            </button>
          )}
          {/*  */}
          {/* <button className="btn btn-secondary text-white px-4" type="submit">
            حفظ
          </button> */}
        </div>
      </form>
    </div>
  );
};
