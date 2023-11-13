//  Routing
import { NavLink } from "react-router-dom";
// Assets
import avatar from "../../../assets/images/User Profile/Avatar.png";
// Firebase
import { query, where, updateDoc, doc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, usersCollRef } from "../../../firebase/firebase";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase/firebase.config";
// React
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./SellerProfileSections.css";
import { UserContext } from "../../../Contexts/UserContext";

export const SellerProfileSections = () => {
  // const [myUser] = useAuthState(auth);
  // const listOfUsers =
  //   myUser && query(usersCollRef, where("uId", "==", myUser?.uid));

  // const [authUser] = useCollectionData(listOfUsers);
  // console.log(authUser);

  // const [userName, setUserName] = useState<string | null | undefined>("");
  // useEffect(() => {
  //   setUserName(authUser && authUser[0].displayName);
  // }, [authUser]);

  const { myUser, authUser } = useContext(UserContext);

  const listOfUsers =
    myUser && query(usersCollRef, where("uId", "==", myUser?.uid));
  const userCollction = useCollection(listOfUsers);
  const userDocId = userCollction[0]?.docs[0].id;

  const [uploadFile, uploading, error] = useUploadFile();
  const [avatarUrl, setAvatarUrl] = useState("");
  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files && e.target.files[0];
    const avatarRef = authUser && ref(storage, `avatars/${authUser[0].uId}`);
    if (avatarRef && avatar) {
      await uploadFile(avatarRef, avatar, {
        contentType: avatar.type,
      });
      const url = await getDownloadURL(avatarRef);
      const userDocRef = userDocId && doc(firestore, "users", userDocId);
      userDocRef &&
        updateDoc(userDocRef, {
          ...authUser[0],
          avatarURL: url,
        });
    }
  };

  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img">
            {authUser && authUser[0].avatarURL ? (
              <img
                src={authUser[0].avatarURL}
                alt=""
                style={{ width: "100px" }}
              />
            ) : (
              <img src={avatar} alt="" style={{ width: "100px" }} />
            )}
            <label htmlFor="profile-pic">تحديث</label>
            <input
              type="file"
              hidden
              id="profile-pic"
              onChange={(event) => uploadAvatar(event)}
            />
          </div>

          {authUser && (
            <h4 className="mt-2 fs-5">مرحبا {authUser[0].displayName} </h4>
          )}
        </div>
        <ul className="mt-4 mb-0 d-flex flex-column p-0 ">
          <li>
            <NavLink end to={"/seller/profile"}>
              حسابي
            </NavLink>
          </li>
          <li>
            <NavLink to={"./products"}>المنتجات</NavLink>
          </li>
          <li>
            <NavLink to={"./posts"}>المنشورات</NavLink>
          </li>
          <li>
            <NavLink to={"./posts/saved"}>المنشورات المحفوظة</NavLink>
          </li>
        </ul>
        <div className="text-center border-top ">
          <NavLink to={"/"}>تسجيل الخروج</NavLink>
        </div>
      </div>
    </div>
  );
};
