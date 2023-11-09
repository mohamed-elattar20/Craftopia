// Imgs
import plates from "../../assets/images/latets Offers/plates.png";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
// Components
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
// Css
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
const ProductCard = () => {
  return (
    <>
      <div className="card border-0 shadow">
        <div className="img-icons-container position-relative">
          <NavLink to={`/product-details/${5}`}>
            <img src={plates} className="card-img-top" alt="product" />
          </NavLink>
          <div className="right-icons position-absolute top-0 mt-2 me-3 d-flex flex-column ">
            <button
              title="fav"
              className=" rounded-pill py-1 bg-black border-0 bg-opacity-50 text-light mb-2"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <ProductDetailsModal />
          </div>
          <div className="sale-icon position-absolute top-0 mt-2 ms-2">
            <span className="rounded-pill bg-black px-2 bg-opacity-50 text-light  ">
              20% -
            </span>
          </div>
        </div>
        <div className="card-body text-end">
          <h5 className="card-title mb-3">
            10 اطباق مزينة بفن الديكوباج بزينة عصرية
          </h5>
          <h5 className="card-text mb-3">EGP 1500.00</h5>
          <AddToCartBtn />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
