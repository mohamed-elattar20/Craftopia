import { useAuthState } from "react-firebase-hooks/auth";
import avatar from "../../../assets/images/User Profile/Avatar.png";
import { NavLink } from "react-router-dom";
import { auth } from "../../../firebase/firebase";

export const SellerProfileSections = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="text-center">
          <img src={avatar} alt="" style={{ width: "70px" }} />
          <h4 className="mt-2 fs-5">{user?.displayName}</h4>
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
