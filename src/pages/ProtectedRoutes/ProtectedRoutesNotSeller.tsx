import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

export const ProtectedRoutesNotSeller = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser && currentUser.Rule === "seller") {
    return (
      <Navigate to={`/seller/profile`} state={{ from: location }} replace />
    );
  } else {
    return <Outlet />;
  }
};
