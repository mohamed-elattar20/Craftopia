import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { any } from "prop-types";

type UserContextProps = {
  children: React.ReactNode;
};

export const UserContext = createContext(any);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<any>();
  //   console.log(myUser);

  //   console.log(myUser?.email);
  //   console.log(myUser?.uid);
  //   const [myUser] = useAuthState(auth);
  useEffect(() => {
    // setUser(myUser);
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </>
  );
};
