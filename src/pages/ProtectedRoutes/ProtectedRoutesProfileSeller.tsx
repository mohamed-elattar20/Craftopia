import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesProfileSeller = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser && currentUser.Rule === "seller") {
    return <Outlet />;
  } else {
    return <Navigate to={`/`} state={{ from: location }} replace />;
  }
};

export default ProtectedRoutesProfileSeller;
