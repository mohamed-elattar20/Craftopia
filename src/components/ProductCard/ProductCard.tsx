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

type ProductCardProps = {
  product?: ProductType;
};

const ProductCard = ({ data }: DocumentData) => {
  const { authUser, curr } = useContext(UserContext);
  const [isInWishList, setIsInWishList] = useState(false);

  const toggleWishlist = (product: any) => {
    if (curr && authUser) {
      const userRef = doc(firestore, "users", curr.docs[0].id);
      if (authUser[0].wishList[product.productId]) {
        let updatedWishList = authUser[0].wishList;
        delete updatedWishList[product.productId];
        updateDoc(userRef, {
          ...authUser[0],
          wishList: { ...updatedWishList },
        });
        setIsInWishList(false);
        console.log("product removed");
      } else {
        if (authUser) {
          updateDoc(userRef, {
            ...authUser[0],
            wishList: { ...authUser[0].wishList, [product.productId]: product },
          });
          console.log("product added");
          setIsInWishList(true);
        }
      }
    }
  };
  useEffect(() => {
    if (authUser) {
      if (authUser[0].wishList[data.productId]) setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [authUser, data]);

  return (
    <>
      <div className="card border-0 shadow">
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
          <div className="right-icons position-absolute top-0 mt-2 me-3 d-flex flex-column ">
            <button
              onClick={() => toggleWishlist(data)}
              title="fav"
              className=" rounded-pill py-1 bg-black border-0 bg-opacity-50 text-light mb-2"
            >
              {isInWishList ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={heartOutline} />
              )}
            </button>
            <ProductDetailsModal modalData={data} key={data?.productId} />
          </div>
          <div className="sale-icon position-absolute top-0 mt-2 ms-2">
            <span className="rounded-pill bg-black px-2 bg-opacity-50 text-light  ">
              20% -
            </span>
          </div>
        </div>
        <div className="card-body text-end">
          <h5 className="card-title mb-3">{data?.productTitle} </h5>
          <h5 className="card-text mb-3">{data?.productPrice} EGP</h5>
          <AddToCartBtn />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
