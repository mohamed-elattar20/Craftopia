import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function UserAddCommentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitControl = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(submitControl)}>
      <div className="d-flex align-items-center">
        <textarea
          className="form-control add-comment"
          id="exampleFormControlTextarea1"
          rows={1}
          {...register("add-comment", {
            required: "رجاء اكتب  تعليقك ",
          })}
        ></textarea>

        <button type="submit" className=" btn btn-primary border-0 p-2 ">
          <p className="m-0">تعليق</p>
        </button>
      </div>
      <small className="text-danger">
        <ErrorMessage errors={errors} name="add-comment" />
      </small>
    </form>
  );
}
