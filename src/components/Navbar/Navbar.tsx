import logo from "../../assets/images/logo4-04.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
//  Context
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
// Firebase
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../../firebase/firebase";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { User, onAuthStateChanged } from "@firebase/auth";
import { query, where } from "@firebase/firestore";
function Navbar() {
  // Context
  // const user: any = useContext(UserContext);
  // console.log(user);
  const [userLogged] = useAuthState(auth);
  const [name, setName] = useState<string | null | undefined>("");
  useEffect(() => {
    setName(userLogged?.displayName);
  }, [userLogged]);
  // console.log(userLogged?.uid);

  // const [users] = useCollectionData(usersCollRef);
  // console.log(users);
  //

  //  ?????????????????
  // const newUserFilterd = users?.filter((user) => user.uid == userLogged?.uid);
  // console.log(newUserFilterd);

  const [signOutUser, loadingg, errorr] = useSignOut(auth);
  const signOut = () => {
    signOutUser().then(() => {
      console.log(`User Signed out Successfully`);
    });
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
              className="form-control me-4"
              type="search"
              placeholder="ابحث..."
              aria-label="Search"
            />
            <button className="btn btn-primary me-2" type="submit">
              بحث
            </button>
          </form>
          <ul className="navbar-nav flex-grow-1 justify-content-between">
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
            {/*  */}
            {userLogged ? (
              <li className="nav-item">
                <NavLink onClick={signOut} className="nav-link" to={`/`}>
                  تسجيل الخروج ؟
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/login`}>
                  مرحباً. تسجيل الدخول؟
                </NavLink>
              </li>
            )}

            {/*  */}
            {userLogged && (
              <li className="nav-item nav-link">
                مرحبا بك {userLogged?.displayName}
              </li>
            )}

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
          <p>Lorem</p>
        </div>
      </div>
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
          <p>Lorem</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
