import "./ContactUs.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitControl = (data: any) => console.log(data);
  return (
    <div className="col-12 col-md-8">
      <form onSubmit={handleSubmit(submitControl)}>
        <div className="row mb-0 mb-md-4">
          <div className="col-12 col-md-6">
            <label htmlFor="firstname" className="mb-2">
              الاسم الأول
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0 "
              placeholder="First name"
              id="firstname"
              {...register("firstname", {
                required: "برجاء ادخال الاسم الاول",
                pattern: {
                  value: /^[a-z]+$/i,
                  message: "Please Enter a Valid Name",
                },
                minLength: {
                  value: 3,
                  message: "the name should be at least three characters",
                },
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="firstname" />
            </small>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="lastname" className="mb-2">
              الاسم الأخير
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="Last name"
              id="lastname"
              {...register("lastname", {
                required: "برجاء ادخال الاسم الاخير",
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: "Please Enter a Valid Name",
                },
                minLength: {
                  value: 3,
                  message: "the name should be at least three characters",
                },
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="lastname" />
            </small>
          </div>
        </div>
        <div className="row mb-0 mb-md-4">
          <div className="col-12 col-md-6">
            <label htmlFor="phonenumber" className="mb-2">
              رقم الهاتف
            </label>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="+2 012 3456 789"
              {...register("phonenumber", {
                required: "برجاء ادخال رقم الهاتف",
                pattern: {
                  value: /^01[0-2,5]{1}[0-9]{8}$/,
                  message: "Please Enter a Valid Phone Number",
                },
              })}
            />
            <small className="text-danger">
              <ErrorMessage errors={errors} name="phonenumber" />
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
              className="form-control mb-4"
              placeholder="اكتب رسالتك..."
              id="message"
              {...register("message", { required: "من فضلك اترك رسالتك" })}
            ></textarea>
            <small className="text-danger">
              <ErrorMessage errors={errors} name="message" />
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-primary fw-bold px-4 py-2 ">
            إرسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
