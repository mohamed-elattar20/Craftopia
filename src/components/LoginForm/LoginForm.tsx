//  CSS
import "./LoginForm.css";
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Types
type Inputs = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container margin-container  rounded-4 ">
        <div className="row justify-content-center">
          <h1 className="display-1 text-center mb-5 fw-bold">كرافتوبيا</h1>
          <div className="col-sm-12 col-md-8 col-lg-4">
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
                <a href="#" id="passHelp" className="form-text ">
                  هل نسيت كلمة السر ؟
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                تسجيل الدخول
              </button>
              <div className="text-center">
                <p className=" mt-3 text-muted">جديد الى كرافتوبيا ؟</p>
                <a
                  href="#"
                  className="text-center text-decoration-none fw-bold text-primary "
                >
                  انشاء حساب لك في كرافتوبيا
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
