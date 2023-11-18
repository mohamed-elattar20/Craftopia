import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesLogin = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser !== null) {
    return <Navigate to={`/`} state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutesLogin;
