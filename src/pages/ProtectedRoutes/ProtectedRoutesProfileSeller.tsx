import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesProfileSeller = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser && currentUser.Rule === "seller") {
    return <Outlet />;
  } else {
    return <Navigate to={`/`} />;
  }

  // return myUser && authUser && authUser[0].Rule === "seller" ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={`/`} />
  // );
};

export default ProtectedRoutesProfileSeller;
