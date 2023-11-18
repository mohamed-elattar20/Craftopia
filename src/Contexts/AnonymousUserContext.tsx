import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

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
    }
  }, [currentUser]);

  return (
    <AnonymousUserContext.Provider value={{ anonymousCartItems, setCartItems }}>
      {children}
    </AnonymousUserContext.Provider>
  );
};
