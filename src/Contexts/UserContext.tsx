import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, usersCollRef } from "../firebase/firebase";
import { User } from "firebase/auth";
import {
  DocumentData,
  DocumentReference,
  doc,
  query,
  where,
} from "firebase/firestore";
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
  usersCollection: DocumentData | undefined;
  userRef: "" | DocumentReference<DocumentData, DocumentData> | undefined;
};

export const UserContext = createContext<myUserContext>({} as myUserContext);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [myUser] = useAuthState(auth);
  console.log(myUser);

  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const [authUser] = useCollectionData(listOfUsers);
  const [usersCollection] = useCollection(listOfUsers);
  const [currentUser] = useCollection(listOfUsers);
  const userId = currentUser?.docs[0].id;
  const userRef = userId && doc(firestore, "users", userId);
  console.log(userRef);

  return (
    <>
      <UserContext.Provider
        value={{ myUser, authUser, usersCollection, userRef }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
