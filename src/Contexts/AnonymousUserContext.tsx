import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

type AnonymousUserContextType = {
  anonymousCartItems: any;
  setCartItems: any;
};
type AnonymousUserContextProviderProps = {
  children: React.ReactNode;
};

export const AnonymousUserContext = createContext<AnonymousUserContextType>(
  {} as AnonymousUserContextType
);

export const AnonymousUserContextProvider = ({
  children,
}: AnonymousUserContextProviderProps) => {
  const [anonymousCartItems, setCartItems] = useState({});
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCartItems(JSON.parse(localStorage.getItem("cart")!));
    }
  }, []);

  useEffect(() => {
    if (anonymousCartItems && Object.values(anonymousCartItems)?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(anonymousCartItems));
    }
  }, [anonymousCartItems]);
  useEffect(() => {
    if (currentUser) {
      setCartItems({});
      let userCart = currentUser?.cart;
      const userRef = currentUser && doc(firestore, "users", currentUser?.uId);
      const addToCartFuncUser = async (product: any, quantity: number) => {
        if (userRef && !userCart[product.productId]) {
          userCart = {
            ...userCart,
            [product.productId]: { ...product, quantity: quantity },
          };
          await updateDoc(userRef, {
            ...currentUser,
            cart: userCart,
          }).then((res) => {
            console.log(`Added *************************************`);
          });
        } else {
          if (userRef) {
            userCart = {
              ...userCart,
              [product.productId]: {
                ...product,
                quantity: userCart[product.productId].quantity + quantity,
              },
            };
            await updateDoc(userRef, {
              ...currentUser,
              cart: userCart,
            }).then((res) => {
              console.log(
                `quantity plus by 1 *************************************`
              );
            });
          }
        }
      };

      if (currentUser) {
        if (localStorage.getItem("cart")) {
          const cartItems: Object = JSON.parse(localStorage.getItem("cart")!);
          for (let i = 0; i < Object.values(cartItems).length; i++) {
            let product = Object.values(cartItems)[i];
            addToCartFuncUser(product, product.quantity);
          }
          localStorage.removeItem("cart");
        }
      }
    }
  }, [currentUser]);

  return (
    <AnonymousUserContext.Provider value={{ anonymousCartItems, setCartItems }}>
      {children}
    </AnonymousUserContext.Provider>
  );
};
