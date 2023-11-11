import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesProfilebuyer = () => {
  const { myUser, authUser } = useContext(UserContext);

  return myUser && authUser && authUser[0].Rule == "buyer" ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} />
  );
};

export default ProtectedRoutesProfilebuyer;
