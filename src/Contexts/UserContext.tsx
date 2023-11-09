import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../firebase/firebase";
import { User } from "firebase/auth";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

type UserContextProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<Array<any>>([]);

export const UserContextProvider = ({ children }: UserContextProps) => {
  // const [myUser] = useAuthState(auth);

  // const listOfUsers =
  //   myUser && query(usersCollRef, where("uId", "==", myUser?.uid));

  // const [authUser] = useCollectionData(listOfUsers); // [{One User}]

  // const [userName, setUserName] = useState<string | null | undefined>("");
  // useEffect(() => {
  //   setUserName(authUser && authUser[0].displayName);
  // }, [authUser]);
  return (
    <>
      {/* <UserContext.Provider value={}>{children}</UserContext.Provider> */}
    </>
  );
};
