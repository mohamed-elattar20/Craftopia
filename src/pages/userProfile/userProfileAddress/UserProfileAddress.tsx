import { useForm, SubmitHandler } from "react-hook-form";
import { RequiredInput } from "../../../components/RequiredInput/RequiredInput";
import { UserProfileTaps } from "../userProfileTaps/UserProfileTaps";

type Inputs = {
  address: string;
};

export const UserProfileAddress = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="border p-5 px-2 px-sm-5 flex-grow-1 rounded-4">
      <UserProfileTaps />
      <h2 className="text-center my-4">العناوين</h2>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label htmlFor="address" className="form-label">
            العنوان
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            defaultValue="سيدي جابر الاسكندرية"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-start text-danger">This field is required</p>
          )}
        </div>

        {/* <RequiredInput
          id="Address"
          value="سيدي جابر الاسكندرية"
          label="العنوان"
        /> */}
        <div className="d-flex flex-column flex-sm-row justify-content-end gap-3 ">
          <button className="btn btn-outline-secondary" type="button">
            إضافة عنوان أخر
          </button>
          <button className="btn btn-secondary text-white px-4" type="submit">
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};
