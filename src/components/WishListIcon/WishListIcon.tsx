import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { firestore } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";

export const WishListIcon = ({ data }: DocumentData) => {
  const { authUser, usersCollection } = useContext(UserContext);
  const [isInWishList, setIsInWishList] = useState(false);

  const toggleWishlist = (product: any) => {
    if (usersCollection && authUser) {
      const userRef = doc(firestore, "users", usersCollection.docs[0].id);
      if (authUser[0].wishList[product.productId]) {
        let updatedWishList = authUser[0].wishList;
        delete updatedWishList[product.productId];
        updateDoc(userRef, {
          ...authUser[0],
          wishList: { ...updatedWishList },
        });
        console.log("product removed");
      } else {
        if (authUser) {
          updateDoc(userRef, {
            ...authUser[0],
            wishList: { ...authUser[0].wishList, [product.productId]: product },
          });
          console.log("product added");
        }
      }
    }
    setIsInWishList((prev) => !prev);
  };

  useEffect(() => {
    if (authUser) {
      if (authUser[0].wishList[data?.productId]) setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [authUser, data]);

  return (
    <>
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
    </>
  );
};
