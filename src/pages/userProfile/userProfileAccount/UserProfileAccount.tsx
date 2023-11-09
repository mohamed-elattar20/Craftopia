import { useForm, SubmitHandler } from "react-hook-form";
import "./userProfileAccount.css";
import { UserProfileTaps } from "../userProfileTaps/UserProfileTaps";

type Inputs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  password: string;
  newPassword: string;
  repeatedNewPassword: string;
};

export const UserProfileAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            className="form-control text-start"
            id="firstName"
            defaultValue="Ahmed"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-start text-danger">This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">
            الاسم الأخير
          </label>
          <input
            type="text"
            className="form-control text-start"
            id="lastName"
            defaultValue="Khamis"
            {...register("lastName", { required: true })}
          ></input>
          {errors.lastName && (
            <p className="text-start text-danger">This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="form-label">
            رقم الهاتف
          </label>
          <input
            type="text"
            className="form-control text-start"
            id="phoneNumber"
            defaultValue="+0201000406896"
            {...register("phoneNumber", {
              required: "This field is required",
              pattern: {
                value: /^\+020\d{10}$/,
                message: "Invalid phone number",
              },
            })}
          ></input>
          {errors.phoneNumber && (
            <p className="text-start text-danger">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="additionalPhoneNumber" className="form-label">
            رقم هاتف إضافي
          </label>
          <input
            type="text"
            className="form-control text-start"
            id="additionalPhoneNumber"
            defaultValue="+020100040689"
            {...register("additionalPhoneNumber", {
              pattern: {
                value: /^(?:\+020\d{10})?$/,
                message: "Invalid phone number",
              },
            })}
          ></input>
          {errors.additionalPhoneNumber && (
            <p className="text-start text-danger">
              {errors.additionalPhoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            كلمة المرور الحالية
          </label>
          <input
            type="password"
            className="form-control text-start"
            id="password"
            defaultValue="+020100040689"
            {...register("password", { required: true })}
          ></input>
          {errors.password && (
            <p className="text-start text-danger">This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="newPassword" className="form-label">
            كلمة المرور الجديدة
          </label>
          <input
            type="password"
            className="form-control text-start"
            id="newPassword"
            {...register("newPassword")}
          ></input>
        </div>
        <div>
          <label htmlFor="repeatedNewPassword" className="form-label">
            كرر كلمة المرور الجديدة
          </label>
          <input
            type="password"
            className="form-control text-start"
            id="repeatedNewPassword"
            {...register("repeatedNewPassword")}
          ></input>
          {errors.repeatedNewPassword && (
            <p className="text-start text-danger">This field is required</p>
          )}
        </div>
        <div className="text-start">
          <button className="btn btn-secondary text-white px-4" type="submit">
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};
