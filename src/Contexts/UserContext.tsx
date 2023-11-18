import { useEffect, useState } from "react";
import { createContext } from "react";
//  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, firestore, usersCollRef } from "../firebase/firebase";
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
import { UserType } from "../Types/UserType";
import { Spinner } from "../components/Spinner/Spinner";

type UserContextProps = {
  children: React.ReactNode;
};
type myUserContext = {
  myUser: User | null | undefined;
  authUser: DocumentData[] | undefined;
  usersCollection: DocumentData | undefined;
  currentUser: UserType | undefined | null | DocumentData;
  userRef: "" | DocumentReference<DocumentData, DocumentData> | undefined;
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
  const [currentUserr] = useCollection(listOfUsers);
  const userId = currentUserr && currentUserr?.docs[0].id;
  const userRef = userId && doc(firestore, "users", userId);
  console.log(userRef);

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
        value={{ myUser, authUser, usersCollection, currentUser, userRef }}
      >
        {currentUser === undefined ? (
          <div className="mt-5 d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          children
        )}
      </UserContext.Provider>
    </>
  );
};
