import avatar from "../../../assets/images/User Profile/Avatar.png";
import { NavLink } from "react-router-dom";
import "./userProfileSections.css";
// Authentication
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../../../firebase/firebase";
import { useEffect, useMemo, useState } from "react";
import { query } from "express";
import { DocumentData, Query, where } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface User {
  uid: string;
}
export const UserProfileSections = () => {


  //  Auth
  const [user] = useAuthState(auth);
  const [name, setName] = useState<string | null | undefined>("");
  useEffect(() => {
    setName(user?.displayName);
  }, [user]);
  //
  const location = useLocation();
  const isActiveLink = (path: string): boolean => {
    return location.pathname.startsWith(path);
  };


  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="text-center">
          <img src={avatar} alt="" style={{ width: "70px" }} />
          <h4 className="mt-2 fs-5">{user?.displayName}</h4>
        </div>
        <ul className="mt-4 mb-0 d-flex flex-column p-0 ">
          <li>
            <NavLink end to={"/user/profile"}>
              حسابي
            </NavLink>
          </li>
          <li>
            <NavLink to={"./address"}>العناوين</NavLink>
          </li>
          <li>
            <NavLink to={"./orders"}>الطلبات</NavLink>
          </li>
          <li>
            <NavLink to={"./wishlist"}>المنتجات المفضلة</NavLink>
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