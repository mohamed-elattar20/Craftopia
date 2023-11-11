import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesProfileSeller = () => {
  const { myUser, authUser } = useContext(UserContext);
  console.log(authUser && authUser[0].Rule);

  return myUser && authUser && authUser[0].Rule == "seller" ? (
    <Outlet />
  ) : (
    <Navigate to={`/seller/profile`} />
  );
};

export default ProtectedRoutesProfileSeller;
