import { Navigate, Outlet, useLocation } from "react-router-dom";
// Firebase
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesProfile = () => {
  const { myUser, authUser } = useContext(UserContext);
  console.log(authUser && authUser[0].Rule);
  console.log(myUser);
  const location = useLocation();

  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} state={{ from: location }} replace />

  );
};

export default ProtectedRoutesProfile;
