import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesProfilebuyer = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser && currentUser.Rule === "buyer") {
    return <Outlet />;
  } else {
    return <Navigate to={`/`} state={{ from: location }} replace />;
  }
};

export default ProtectedRoutesProfilebuyer;
