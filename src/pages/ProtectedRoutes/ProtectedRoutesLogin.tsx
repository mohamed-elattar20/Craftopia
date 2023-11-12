import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProtectedRoutesLogin = () => {
  const { myUser, authUser } = useContext(UserContext);
  console.log(myUser);

  return localStorage.getItem("token") ? <Navigate to={`/`} /> : <Outlet />;
};

export default ProtectedRoutesLogin;
