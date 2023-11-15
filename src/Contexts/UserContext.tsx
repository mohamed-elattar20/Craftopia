import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { DocumentData, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { UserType } from "../Types/UserType";

type UserContextProps = {
  children: React.ReactNode;
};
type myUserContext = {
  myUser: User | null | undefined;
  authUser: DocumentData[] | undefined;
  usersCollection: DocumentData | undefined;
  currentUser: UserType | undefined | null | DocumentData;
};

export const UserContext = createContext<myUserContext>({} as myUserContext);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [currentUser, setCurrentUser] = useState<
    UserType | undefined | null | DocumentData
  >();
  const [myUser] = useAuthState(auth);
  console.log(myUser);

  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const [authUser] = useCollectionData(listOfUsers);
  const [usersCollection] = useCollection(listOfUsers);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (current) => {
      if (current) {
        authUser && setCurrentUser(authUser[0]);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [authUser]);

  return (
    <>
      <UserContext.Provider
        value={{ myUser, authUser, usersCollection, currentUser }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
