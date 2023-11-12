// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// Firebase
import {
  DocumentData,
  doc,
  query,
  updateDoc,
  where,
  getFirestore,
  getDoc,
} from "firebase/firestore";
// React
import { useContext } from "react";
//  Context
import { UserContext } from "../../Contexts/UserContext";
import { firestore, usersCollRef } from "../../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

type AddToCartBtnProps = {
  product?: DocumentData;
};

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  // ***************************************
  const { myUser, authUser } = useContext(UserContext);

  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const [currentUser] = useCollection(listOfUsers);
  const userId = currentUser?.docs[0].id;
  // console.log(CurrentUser?.docs[0].id);

  const userRef = userId && doc(firestore, "users", userId);

  const addToCartFunc = (product: any) => {
    // ************************************************************************************************
    // ************************************************************************************************
    // *******************
    // console.log(typeof productsMap);
    //  *****************************************
    // console.log(typeof currentUser?.docs[0].data().cart);

    let userCart = currentUser?.docs[0].data().cart;
    if (userRef && !userCart[product.productId]) {
      updateDoc(userRef, {
        ...currentUser?.docs[0].data(),
        cart: { ...userCart, [product.productId]: { ...product, quantity: 1 } },
      }).then((res) => {
        console.log(`Added *************************************`);
      });
    } else {
      if (userRef) {
        updateDoc(userRef, {
          ...currentUser?.docs[0].data(),
          cart: {
            ...userCart,
            [product.productId]: {
              ...product,
              quantity: userCart[product.productId].quantity + 1,
            },
          },
        }).then((res) => {
          console.log(
            `quantity plus by 1 *************************************`
          );
        });
      }
    }
    // ***************************************
    // if (productRef) {
    //   updateDoc(productRef, {
    //     ...currentUser?.docs[0].data(),
    //     cart: [...currentUser?.docs[0].data().cart, product],
    //   }).then((res) => {
    //     console.log(res);
    //     console.log(`Added *************************************`);
    //   });
    // }
  };

  return (
    <>
      <button
        onClick={() => addToCartFunc(product)}
        className="btn btn-primary "
      >
        أضف الى السلة
        <FontAwesomeIcon className="me-1 me-md-2" icon={faShoppingCart} />
      </button>
    </>
  );
};

export default AddToCartBtn;
