//  Routing
import { NavLink } from "react-router-dom";
// Assets
import avatar from "../../../assets/images/User Profile/Avatar.png";
// Firebase
import { query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
// React
import { useEffect, useState } from "react";

export const SellerProfileSections = () => {
  const [myUser] = useAuthState(auth);
  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));

  const [authUser] = useCollectionData(listOfUsers);
  console.log(authUser);

  const [userName, setUserName] = useState<string | null | undefined>("");
  useEffect(() => {
    setUserName(authUser && authUser[0].displayName);
  }, [authUser]);

  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="text-center">
          <img src={avatar} alt="" style={{ width: "70px" }} />

          {myUser && <h4 className="mt-2 fs-5">مرحبا {userName}</h4>}
        </div>
        <ul className="mt-4 mb-0 d-flex flex-column p-0 ">
          <li>
            <NavLink end to={"/seller/profile"}>
              حسابي
            </NavLink>
          </li>
          <li>
            <NavLink to={"./products"}>المنتجات</NavLink>
          </li>
          <li>
            <NavLink to={"./posts"}>المنشورات</NavLink>
          </li>
          <li>
            <NavLink to={"./posts/saved"}>المنشورات المحفوظة</NavLink>
          </li>
        </ul>
        <div className="text-center border-top ">
          <NavLink to={"/"}>تسجيل الخروج</NavLink>
        </div>
      </div>
    </div>
  );
};
