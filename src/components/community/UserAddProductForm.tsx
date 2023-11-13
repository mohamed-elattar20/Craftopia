import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function UserAddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitControl = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(submitControl)}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          اضافة صورة المنتج
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="exampleFormControlInput1"
          {...register("add-img", {
            required: "رجاء اضف صورة المنتج",
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="add-img" />
        </small>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          اضافة تعليق
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          {...register("add-comment", {
            required: "رجاء اكتب  توضيح لطلبك",
          })}
        ></textarea>
        <small className="text-danger">
          <ErrorMessage errors={errors} name="add-comment" />
        </small>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          اغلاق
        </button>
        <button type="submit" className="btn btn-primary">
          اضافة
        </button>
      </div>
    </form>
  );
}
