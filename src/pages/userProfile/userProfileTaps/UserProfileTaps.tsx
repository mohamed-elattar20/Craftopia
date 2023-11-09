import { NavLink } from "react-router-dom";
import "./userProfileTaps.css";

export const UserProfileTaps = () => {
  return (
    <ul className="user-profile-taps nav nav-pills nav-fill row row-cols-1  d-md-none">
      <li className="nav-item col">
        <NavLink to={"/user/profile"} end className="nav-link">
          حسابي
        </NavLink>
      </li>
      <li className="nav-item col">
        <NavLink to={"/user/profile/address"} className="nav-link">
          العناوين
        </NavLink>
      </li>
      <li className="nav-item col">
        <NavLink to={"/user/profile/orders"} className="nav-link">
          الطلبات
        </NavLink>
      </li>
      <li className="nav-item col">
        <NavLink to={"/user/profile/wishlist"} className="nav-link">
          المنشورات المحفوظة
        </NavLink>
      </li>
      <li className="nav-item col">
        <NavLink to={"/user/profile/posts"} className="nav-link">
          المنشورات
        </NavLink>
      </li>
      <li className="nav-item col">
        <NavLink to={"/user/profile/posts/saved"} className="nav-link">
          المنشورات المحفوظة
        </NavLink>
      </li>
    </ul>
  );
};
