import { Navigate, Outlet } from "react-router-dom";
// Firebase
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesProfile = () => {
  const { myUser, authUser } = useContext(UserContext);
  // console.log(authUser);

  return !myUser ? <Navigate to={`/`} /> : <Outlet />;
};

export default ProtectedRoutesProfile;
