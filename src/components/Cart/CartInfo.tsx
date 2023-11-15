import { useForm, Controller } from "react-hook-form";
import egyptGovernoratesData from "../../pages/RegisterPage/RegisterBuyer/governorates.json";
import Select from "react-select";
import "react-phone-number-input/style.css";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartInfo = ({ nextPage }: CartPurchasesProps) => {
  const governorates = egyptGovernoratesData.egyptGovernorates;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data: {}) => console.log(data);

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
              <div className="form-text mb-2">المدينة</div>
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
            <div className="col-12 col-md-6 pt-3">
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
