import avatar from "../../../assets/images/User Profile/Avatar.png";
import { NavLink } from "react-router-dom";
import "./userProfileSections.css";

export const UserProfileSections = () => {
  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="text-center">
          <img src={avatar} alt="" style={{ width: "70px" }} />
          <h4 className="mt-2 fs-5">Ahmed Khamis</h4>
        </div>
        <ul className="mt-4 mb-0 d-flex flex-column p-0 ">
          <li>
            <NavLink to={"./"}>حسابي</NavLink>
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
