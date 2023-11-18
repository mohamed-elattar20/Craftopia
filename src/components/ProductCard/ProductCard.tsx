// Imgs
import plates from "../../assets/images/latets Offers/plates.png";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
// Components
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
// Css
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { ProductType } from "../../Types/ProductType";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { firestore } from "../../firebase/firebase";
import { WishListIcon } from "../WishListIcon/WishListIcon";

type ProductCardProps = {
  data?: DocumentData;
};

const ProductCard = ({ data }: ProductCardProps) => {
  // console.log("red");

  return (
    <>
      <div className="card border-0 shadow ">
        <div className="img-icons-container position-relative">
          <NavLink
            to={{ pathname: `/product-details/${data?.productId}` }}
            state={{ data }}
          >
            <img
              src={data?.productImages[0].imgUrl}
              className="card-img-top"
              alt="product"
            />
          </NavLink>

          <div
            style={{ right: "0" }}
            className="right-icons position-absolute top-0  me-2 d-flex flex-column "
          >
            <ProductDetailsModal modalData={data} key={data?.productId} />
          </div>

          <div className="sale-icon position-absolute top-0 mt-2 ms-2">
            {!!data?.discount && (
              <span className="rounded-pill bg-black px-2 bg-opacity-50 text-light">
                {data?.discount}%
              </span>
            )}
          </div>
        </div>
        <div className="card-body text-end">
          <h5 className="card-title mb-3">{data?.productTitle} </h5>
          <h4 className="card-text mb-3">{data?.productPrice} EGP</h4>
          <div className="d-flex">
            <div className="flex-grow-1">
              <AddToCartBtn product={data} />
            </div>
            <span className="me-2">
              <WishListIcon data={data} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
