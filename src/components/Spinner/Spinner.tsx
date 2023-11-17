import { SphereSpinner } from "react-spinners-kit";

type SpinnerProps = {
  size?: number;
};

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <SphereSpinner size={size ? size : 50} color="#686769" loading={true} />
  );
};
