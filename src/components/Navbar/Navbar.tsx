//  Assets
import logo from "../../assets/images/logo4-04.png";
import avatar from "../../assets/images/User Profile/Avatar.png";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
//  Firebase
import { auth } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { signOut } from "@firebase/auth";
import { UserContext } from "../../Contexts/UserContext";
import ProductCartSidebar from "../ProductCartSidebar/ProductCartSidebar";
import ProductWishListSidebar from "../ProductWishListSidebar/ProductWishListSidebar";
import "./Navbar.css";

function Navbar() {
  // Authentication **************
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // Search *********************************
  const [searchInput, setSearchInput] = useState<string>("");
  const searchFunc = () => {
    navigate(`search/${searchInput}`);
  };

  return (
    <div className="container justify-content-between">
      <nav className="navbar navbar-expand-lg ">
        <NavLink className="navbar-brand ms-5" to="/">
          <img
            src={logo}
            alt="logo"
            width="100"
            height="40"
            className="d-inline-block align-text-top"
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex flex-grow-1" role="search">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="form-control me-4"
              type="search"
              placeholder="ابحث..."
              aria-label="Search"
            />
            <button
              onClick={searchFunc}
              className="btn btn-primary me-2"
              type="button"
            >
              بحث
            </button>
          </form>
          <ul className="navbar-nav flex-grow-1 justify-content-between align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={`/`}>
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/store`}>
                التسوق
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/contact-us`}>
                تواصل معنا
              </NavLink>
            </li>
            {currentUser ? (
              <div className="dropdown">
                <li
                  className="nav-item nav-link "
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div>
                      <img
                        src={
                          currentUser.avatarURL ? currentUser.avatarURL : avatar
                        }
                        alt=""
                        style={{ width: "40px", borderRadius: "50%" }}
                      />
                    </div>
                    <h4 className="fs-6 m-0">مرحبا {currentUser.firstName}</h4>
                  </div>
                </li>
                <ul className="navbar-dropdown-menu dropdown-menu">
                  <li>
                    <Link
                      className="py-2 px-3 text-end dropdown-item"
                      to={
                        currentUser.Rule === "buyer"
                          ? `/user/profile`
                          : `/seller/profile`
                      }
                    >
                      حسابي
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut(auth);
                        navigate(`/`);
                      }}
                      className="border-0 bg-white text-primary py-2 px-3 text-end dropdown-item"
                    >
                      تسجيل الخروج ؟
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/login`}>
                  مرحباً. تسجيل الدخول؟
                </NavLink>
              </li>
            )}

            {/*  */}
            <li className="nav-item">
              <div className="d-flex">
                {/* offcanvas controls */}
                <button
                  title="fav"
                  className="btn fs-5"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#fav"
                  aria-controls="fav"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-primary" />
                </button>
                <button
                  title="cart"
                  className="btn fs-5"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#cart"
                  aria-controls="cart"
                >
                  <FontAwesomeIcon icon={faCartPlus} className="text-primary" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* offcanvas content */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        id="cart"
        aria-labelledby="cartLabel"
        aria-modal="true"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartLabel">
            العربة
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {currentUser?.cart &&
            Object.values(currentUser.cart)?.map((prod: any) => (
              <ProductCartSidebar key={prod.productId} data={prod} />
            ))}
        </div>
      </div>
      {/* Favourites ****************************************************** */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        id="fav"
        aria-labelledby="favLabel"
        aria-modal="true"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="favLabel">
            المفضلات
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {currentUser?.wishList &&
            Object.values(currentUser.wishList).map((prod: any) => (
              <ProductWishListSidebar key={prod.productId} data={prod} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
