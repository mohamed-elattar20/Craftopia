import { DocumentData, doc, query, updateDoc, where } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { firestore, usersCollRef } from "../../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faTrash,
  faTrashAlt,
  faCartPlus,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { AnonymousUserContext } from "../../Contexts/AnonymousUserContext";

type AddQuantityToProductProps = {
  data?: DocumentData;
};
const AddQuantityToProduct = ({ data }: AddQuantityToProductProps) => {
  const { currentUser } = useContext(UserContext);
  const { setCartItems, anonymousCartItems } = useContext(AnonymousUserContext);

  //
  const userRef = currentUser && doc(firestore, "users", currentUser?.uId);
  const AddQuantity = (product: any) => {
    if (currentUser) {
      let userCart = currentUser?.cart;
      if (userRef && userCart[product.productId]) {
        updateDoc(userRef, {
          ...currentUser,
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
    } else {
      if (anonymousCartItems && anonymousCartItems[product.productId]) {
        setCartItems((prev: any) => ({
          ...prev,
          [product.productId]: {
            ...product,
            quantity: prev[product.productId].quantity + 1,
          },
        }));
      }
    }
  };

  const DecreaseFromCart = (product: any) => {
    if (currentUser) {
      let userCart = currentUser?.cart;
      if (userCart[product.productId].quantity > 1) {
        if (userRef && userCart[product.productId]) {
          updateDoc(userRef, {
            ...currentUser,
            cart: {
              ...userCart,
              [product.productId]: {
                ...product,
                quantity: userCart[product.productId].quantity - 1,
              },
            },
          }).then((res) => {
            console.log(
              `quantity plus by 1 *************************************`
            );
          });
        }
      }
    } else {
      if (
        anonymousCartItems &&
        anonymousCartItems[product.productId].quantity > 1
      ) {
        setCartItems((prev: any) => ({
          ...prev,
          [product.productId]: {
            ...product,
            quantity: prev[product.productId].quantity - 1,
          },
        }));
      }
    }
  };
  //  Delete ************************
  const deleteFromCart = (product: any) => {
    if (currentUser) {
      let userCart = currentUser?.cart;
      if (userRef && userCart[product.productId]) {
        let updatedProducts = userCart;
        delete updatedProducts[product.productId];
        console.log(updatedProducts);
        updateDoc(userRef, {
          ...currentUser,
          cart: {
            ...updatedProducts,
          },
        }).then((res) => {
          console.log(`Product Deleted ******************************`);
        });
      }
    } else {
      if (anonymousCartItems && anonymousCartItems[product.productId]) {
        let updatedCart = anonymousCartItems;
        delete updatedCart[product.productId];
        setCartItems({ ...updatedCart });
      }
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <button
            onClick={() => AddQuantity(data)}
            className="btn btn-outline-primary px-2 py-1"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p className="lead mx-2 mb-0">{data?.quantity}</p>
          <button
            onClick={() => DecreaseFromCart(data)}
            className="btn btn-outline-primary px-2 py-1"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div>
          <button
            onClick={() => deleteFromCart(data)}
            className="btn btn-primary px-2 py-1"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </>
  );
};
export default AddQuantityToProduct;
