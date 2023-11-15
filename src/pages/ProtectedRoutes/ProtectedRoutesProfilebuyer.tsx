import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { auth } from "../../firebase/firebase";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

const ProtectedRoutesProfilebuyer = () => {
  const { myUser, authUser } = useContext(UserContext);
  console.log(authUser);
  console.log(myUser);

  const location = useLocation();

  // *********************************
  // const [userState, setUserState] = useState<DocumentData[] | undefined>();
  // useEffect(() => {
  //   setUserState(authUser);
  //   // console.log(userState);
  // }, [myUser, authUser]);
  // *********************************

  // return localStorage.getItem("token") &&

  return myUser && authUser && authUser[0].Rule == "buyer" ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} state={{ from: location }} replace />
  );
};

export default ProtectedRoutesProfilebuyer;
