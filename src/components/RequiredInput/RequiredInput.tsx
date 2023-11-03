import { useForm } from "react-hook-form";

type RequiredInputProps = {
  id: string;
  label: string;
  value: string;
};

export const RequiredInput = ({ id, label, value }: RequiredInputProps) => {
  type Inputs = {
    id: string;
  };

  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control text-start"
        id={id}
        defaultValue={value}
        {...register("id", { required: true })}
      />
      {errors.id && (
        <p className="text-start text-danger">This field is required</p>
      )}
    </div>
  );
};
