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
import { useNavigate } from "react-router-dom";
// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductType } from "../../Types/ProductType";
import { AnonymousUserContext } from "../../Contexts/AnonymousUserContext";
type AddToCartBtnProps = {
  product?: DocumentData;
};

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  const { currentUser } = useContext(UserContext);
  const { setCartItems, anonymousCartItems } = useContext(AnonymousUserContext);

  const addToCartFuncUser = async (product: any, quantity?: number) => {
    const userRef = doc(firestore, "users", currentUser?.uId);
    let userCart = currentUser?.cart;
    if (userRef && !userCart[product.productId]) {
      await updateDoc(userRef, {
        ...currentUser,
        cart: {
          ...userCart,
          [product.productId]: { ...product, quantity: quantity ?? 1 },
        },
      }).then((res) => {
        notify();
        console.log(`Added *************************************`);
      });
    } else {
      if (userRef) {
        await updateDoc(userRef, {
          ...currentUser,
          cart: {
            ...userCart,
            [product.productId]: {
              ...product,
              quantity: userCart[product.productId].quantity + (quantity ?? 1),
            },
          },
        }).then((res) => {
          notify();
          console.log(
            `quantity plus by 1 *************************************`
          );
        });
      }
    }
  };

  const addToCartFunc = (product: any) => {
    if (currentUser) {
      addToCartFuncUser(product);
    } else {
      if (anonymousCartItems && anonymousCartItems[product.productId]) {
        setCartItems((prev: any) => ({
          ...prev,
          [product.productId]: {
            ...product,
            quantity: prev[product.productId].quantity + 1,
          },
        }));
      } else {
        setCartItems((prev: object) => ({
          ...prev,
          [product.productId]: { ...product, quantity: 1 },
        }));
      }
      localStorage.setItem("cart", JSON.stringify(anonymousCartItems));
      notify();
    }
  };

  const navigate = useNavigate();
  const notify = () =>
    toast.success("تم إضافة المنتج بنجاح", {
      position: "top-left",
      autoClose: 600,
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      pauseOnHover: false,
      rtl: true,
    });

  return (
    <>
      <ToastContainer
        newestOnTop
        autoClose={600}
        closeOnClick
        rtl={true}
        theme="light"
        hideProgressBar
        toastClassName={`shadow-sm `}
      />
      <button
        onClick={() => addToCartFunc(product)}
        className="btn btn-primary w-100"
      >
        أضف الى السلة
        <FontAwesomeIcon className="me-1 me-md-2" icon={faShoppingCart} />
      </button>
    </>
  );
};

export default AddToCartBtn;
