import logo from "../../assets/images/logo4-04.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  return (
    <div className="container justify-content-between">
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand ms-5" href="#">
          <img
            src={logo}
            alt="logo"
            width="100"
            height="40"
            className="d-inline-block align-text-top"
          />
        </a>

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
              <a className="nav-link" aria-current="page" href="#">
                الرئيسية
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                التسوق
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                تواصل معنا
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                مرحباً. تسجيل الدخول؟
              </a>
            </li>
            <li className="nav-item">
              <div className="d-flex">
                {/* offcanvas controls */}
                <button
                  className="btn fs-5"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#fav"
                  aria-controls="fav"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-primary" />
                </button>
                <button
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