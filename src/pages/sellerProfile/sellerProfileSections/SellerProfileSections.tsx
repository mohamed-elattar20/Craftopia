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
  const { currentUser } = useContext(UserContext);

  const [uploadFile, uploading, error] = useUploadFile();
  const [avatarUrl, setAvatarUrl] = useState("");

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files && e.target.files[0];
    const avatarRef = currentUser && ref(storage, `avatars/${currentUser.uId}`);
    if (avatarRef && avatar) {
      await uploadFile(avatarRef, avatar, {
        contentType: avatar.type,
      });
      const url = await getDownloadURL(avatarRef);
      const userDocRef = doc(firestore, "users", currentUser.uId);
      userDocRef &&
        updateDoc(userDocRef, {
          ...currentUser,
          avatarURL: url,
        });
    }
  };

  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img">
            {uploading && <p>loading</p>}
            {currentUser && currentUser.avatarURL ? (
              <img
                src={currentUser.avatarURL}
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

          {currentUser && (
            <h4 className="mt-2 fs-5">{currentUser.displayName} </h4>
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
