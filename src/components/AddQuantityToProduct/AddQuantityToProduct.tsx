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

type AddQuantityToProductProps = {
  data?: DocumentData;
};
const AddQuantityToProduct = ({ data }: AddQuantityToProductProps) => {
  const { myUser, authUser } = useContext(UserContext);

  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const [currentUser] = useCollection(listOfUsers);
  const userId = currentUser?.docs[0].id;
  const userRef = userId && doc(firestore, "users", userId);
  //
  const AddQuantity = (product: any) => {
    let userCart = currentUser?.docs[0].data().cart;
    if (userRef && userCart[product.productId]) {
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
        console.log(`quantity plus by 1 *************************************`);
      });
    }
  };

  const DecreaseFromCart = (product: any) => {
    let userCart = currentUser?.docs[0].data().cart;
    if (userCart[product.productId].quantity > 1) {
      if (userRef && userCart[product.productId]) {
        updateDoc(userRef, {
          ...currentUser?.docs[0].data(),
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
  };
  //  Delete ************************
  const deleteFromCart = (product: any) => {
    let userCart = currentUser?.docs[0].data().cart;
    if (userRef && userCart[product.productId]) {
      let updatedProducts = userCart;
      delete updatedProducts[product.productId];
      console.log(updatedProducts);
      updateDoc(userRef, {
        ...currentUser?.docs[0].data(),
        cart: {
          ...updatedProducts,
        },
      }).then((res) => {
        console.log(`Product Deleted ******************************`);
      });
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
