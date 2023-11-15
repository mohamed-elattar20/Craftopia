// Imgs
import bag1 from "../../assets/images/Product Details/bag-1.jpg";
import bag2 from "../../assets/images/Product Details/bag-2.jpg";
import AddToCartBtn from "../../components/AddToCartBtn/AddToCartBtn";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
// CSS
import "./ProductDetails.css";
import { ComponentsProps } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { WishListIcon } from "../../components/WishListIcon/WishListIcon";
import ProductDetailsDesc from "./ProductDetailsDesc";
import ProductDetailsReviews from "./ProductDetailsReviews";

const ProductDetailsPage = () => {
  let arr = [1, 2, 3, 4];
  const location = useLocation();
  const { state } = location;
  const ProductData = state && state.data;
  console.log(ProductData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [flag, setFlag] = useState<Boolean>(false);
  return (
    <>
      <div className="container my-5 ">
        <div className="row ">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="row g-3">
              <div className="col-12">
                <img
                  className="rounded-3"
                  src={ProductData?.productImages[0]?.imgUrl}
                  alt="product"
                />
              </div>
              <div className="col-4">
                <img
                  className="rounded-3"
                  src={ProductData?.productImages[0]?.imgUrl}
                  alt="product"
                />
              </div>
              <div className="col-4">
                <img
                  className="rounded-3"
                  src={ProductData?.productImages[0]?.imgUrl}
                  alt="product"
                />
              </div>
              <div className="col-4">
                <img
                  className="rounded-3"
                  src={ProductData?.productImages[0]?.imgUrl}
                  alt="product"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h2 className="display-6 mb-3 ">{ProductData?.productTitle}</h2>
            <h3>EGP {ProductData?.productPrice}</h3>
            <div className="my-3">
              <button className="btn btn-secondary px-3">+</button>
              <span className="fw-bold mx-3 lead">0</span>
              <button className="btn btn-secondary px-3">-</button>
            </div>
            <div className="my-4">
              <AddToCartBtn product={ProductData} />
              <WishListIcon data={ProductData} />
            </div>
            <Link to={`/products/${ProductData?.sellerId}`}>
              <h5>{ProductData?.brand}</h5>
            </Link>
            {/* <a href="">
              <FontAwesomeIcon
                className="text-black ms-3"
                icon={faCircleQuestion}
              /> */}

            <span>سياسة الشحن والاسترجاع</span>
            {/* </a> */}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center my-5 d-flex justify-content-center">
            <button
              className={`btn fs-1 ms-5 ${
                !flag ? "text-primary " : "text-muted"
              }`}
              onClick={() => setFlag(false)}
            >
              المواصفات
            </button>
            <button
              className={`btn fs-1 ${!flag ? "text-muted  " : "text-primary"}`}
              onClick={() => setFlag(true)}
            >
              التقييمات
            </button>
          </div>
          {!flag && <ProductDetailsDesc />}
          {flag && <ProductDetailsReviews />}
        </div>
        <div className="row my-5 ">
          <h2 className="mb-4 display-4 text-center ">منتجات ذات صلة</h2>
          {arr.map((prod, index) => (
            <div className="col-6 col-md-6 col-lg-3" key={index}>
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
