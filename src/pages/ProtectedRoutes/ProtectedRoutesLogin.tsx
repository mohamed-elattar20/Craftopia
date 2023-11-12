import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesLogin = () => {
  const { myUser, authUser } = useContext(UserContext);
  console.log(myUser);
  const location = useLocation();

  return myUser ? (
    <Navigate to={`/`} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutesLogin;
