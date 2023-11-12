import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../firebase/firebase";
import { User } from "firebase/auth";
import { DocumentData, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

type UserContextProps = {
  children: React.ReactNode;
};
type myUserContext = {
  myUser: User | null | undefined;
  authUser: DocumentData[] | undefined;
  curr: any;
};

export const UserContext = createContext<myUserContext>({} as myUserContext);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [myUser] = useAuthState(auth);
  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const [authUser] = useCollectionData(listOfUsers);
  const [curr] = useCollection(listOfUsers);

  return (
    <>
      <UserContext.Provider value={{ myUser, authUser, curr }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
