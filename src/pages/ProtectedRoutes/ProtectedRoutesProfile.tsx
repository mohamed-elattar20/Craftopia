import { Navigate, Outlet } from "react-router-dom";
// Firebase
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoutesProfile = () => {
  const [authUser] = useAuthState(auth);
  // console.log(authUser);

  return !authUser ? <Navigate to={`/`} /> : <Outlet />;
};

export default ProtectedRoutesProfile;
