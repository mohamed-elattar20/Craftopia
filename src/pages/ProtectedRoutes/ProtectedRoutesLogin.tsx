import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesLogin = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser !== null) {
    return <Navigate to={`/`} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutesLogin;
