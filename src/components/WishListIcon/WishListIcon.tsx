import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { firestore } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";

export const WishListIcon = ({ data }: DocumentData) => {
  const { currentUser } = useContext(UserContext);
  const [isInWishList, setIsInWishList] = useState(false);

  const toggleWishlist = (product: any) => {
    if (currentUser) {
      const userRef = doc(firestore, "users", currentUser.uId);
      if (currentUser.wishList[product.productId]) {
        let updatedWishList = currentUser.wishList;
        delete updatedWishList[product.productId];
        updateDoc(userRef, {
          ...currentUser,
          wishList: { ...updatedWishList },
        });
        // console.log("product removed");
      } else {
        if (currentUser) {
          updateDoc(userRef, {
            ...currentUser,
            wishList: { ...currentUser.wishList, [product.productId]: product },
          });
          // console.log("product added");
        }
      }
    }
    setIsInWishList((prev) => !prev);
  };

  useEffect(() => {
    if (currentUser?.wishList[data?.productId]) setIsInWishList(true);
    else {
      setIsInWishList(false);
    }
  }, [currentUser, data]);

  return (
    <>
      <button
        onClick={() => toggleWishlist(data)}
        title="fav"
        className=" rounded-pill py-1 bg-black border-0 bg-opacity-50 text-light "
      >
        {isInWishList ? (
          <FontAwesomeIcon className="text-secondary" icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={heartOutline} />
        )}
      </button>
    </>
  );
};
