// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
type Inputs = {
  email: string;
  name: string;
  review: string;
};
const ProductDetailsReviews = () => {
  let arr = [1, 2, 3];
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
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                {/* Email */}
                <label htmlFor="exampleInputEmail1" className="form-label">
                  أضف تقييمك
                </label>
                <textarea
                  {...register("review", {
                    required: {
                      value: true,
                      message: "يجب ان تضيف تقييما لكي يتم إضافته",
                    },
                  })}
                  className={`form-control rounded-0 w-100 input-style ${
                    errors.review?.message && "border-danger"
                  }`}
                ></textarea>
                {errors.review && (
                  <p className="text-danger fw-medium mt-2">
                    {errors.review.message}
                  </p>
                )}
              </div>
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="exampleInputReview1" className="form-label">
                  الاسم
                </label>
                <input
                  autoComplete="off"
                  {...register("name")}
                  placeholder="الاسم"
                  type="text"
                  className={`form-control rounded-0 input-style mb-2 `}
                  id="exampleInputReview1"
                />
              </div>
              <div className="mb-5">
                {/* Email */}
                <label htmlFor="exampleInputEmail1" className="form-label">
                  عنوان البريد الالكتروني
                </label>
                <input
                  {...register("email")}
                  autoComplete="off"
                  placeholder="عنوان البريد الالكتروني"
                  type="email"
                  className={`form-control rounded-0 input-style `}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button type="submit" className="btn btn-primary ">
                أضف التقييم
              </button>
            </form>
          </div>
        </div>
        <div className="row my-5">
          <h2 className="display-4 mb-3">التقييمات : </h2>
          {arr.map((rev) => (
            <div key={rev} className="col-12 my-2">
              <ReviewCard
                name="أحمد ياسر إبراهيم"
                review="منتج جيد جدا يستحق الشراء"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsReviews;
