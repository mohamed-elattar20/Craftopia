import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutesLogin = () => {
  const [authUser] = useAuthState(auth);
  // console.log(authUser);

  return authUser ? <Navigate to={`/`} /> : <Outlet />;
};

export default ProtectedRoutesLogin;
