//  Routing
import { NavLink } from "react-router-dom";
// Assets
import avatar from "../../../assets/images/User Profile/Avatar.png";
// Firebase
import { updateDoc, doc } from "@firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase/firebase.config";
// React
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./SellerProfileSections.css";
import { UserContext } from "../../../Contexts/UserContext";

export const SellerProfileSections = () => {
  const { currentUser } = useContext(UserContext);

  const [uploadFile, , error] = useUploadFile();
  const [loading, setLoading] = useState(true);

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files && e.target.files[0];
    setLoading(true);
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
    setLoading(false);
  };

  const deleteAvatar = async (id: string) => {
    setLoading(true);
    await deleteObject(ref(storage, `avatars/${id}`));
    await updateDoc(doc(firestore, "users", id), {
      ...currentUser,
      avatarURL: "",
    });
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img ">
            <div>
              {loading ? (
                <p
                  className="d-flex align-items-center justify-content-center text-center rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }}
                >
                  loading
                </p>
              ) : (
                <div className="dropdown">
                  <div data-bs-toggle="dropdown" aria-expanded="false">
                    <img
                      role="button"
                      src={
                        currentUser?.avatarURL ? currentUser.avatarURL : avatar
                      }
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                      className="rounded-circle"
                    />
                  </div>

                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="profile-pic">تحديث</label>
                      <input
                        id="profile-pic"
                        type="file"
                        hidden
                        onChange={(event) => uploadAvatar(event)}
                      />
                    </li>
                    {!!currentUser?.avatarURL && (
                      <li>
                        <input
                          type="button"
                          className="dropdown-item"
                          value={"إزلة"}
                          onClick={() => deleteAvatar(currentUser?.uId)}
                        />
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {currentUser && (
            <h4 className="mt-2 fs-5 px-3">{currentUser.displayName} </h4>
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
        </ul>
        <div className="text-center border-top ">
          <NavLink to={"/"}>تسجيل الخروج</NavLink>
        </div>
      </div>
    </div>
  );
};
