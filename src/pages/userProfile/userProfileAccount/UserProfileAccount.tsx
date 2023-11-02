import { useForm, SubmitHandler } from "react-hook-form";
import "./userProfileAccount.css";

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
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="user-account border p-5 flex-grow-1 rounded-4">
      <h2 className="text-center mb-4">بيانات الحساب</h2>
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
            defaultValue="+020100040689"
            {...register("phoneNumber", { required: true })}
          ></input>
          {errors.phoneNumber && (
            <p className="text-start text-danger">This field is required</p>
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
            {...register("additionalPhoneNumber")}
          ></input>
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
        <div>
          <button className="btn btn-primary text-white px-4" type="submit">
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};
