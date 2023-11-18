import { NavLink } from "react-router-dom";
import avatar from "../../../assets/images/User Profile/Avatar.png";
// Authentication
import { auth, firestore } from "../../../firebase/firebase";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { UserContext } from "../../../Contexts/UserContext";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../firebase/firebase.config";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { signOut } from "firebase/auth";

export const SellerProfileTaps = () => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [uploadFile, , error] = useUploadFile();

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const avatar = e.target.files && e.target.files[0];
    const avatarRef = ref(storage, `avatars/${currentUser?.uId}`);
    if (avatarRef && avatar) {
      await uploadFile(avatarRef, avatar, {
        contentType: avatar.type,
      });
      const url = await getDownloadURL(avatarRef);

      const userDocRef = doc(firestore, "users", currentUser?.uId);
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
    <div className="d-md-none">
      <div className="d-flex flex-column align-items-center">
        <div className="profile-img mb-4">
          {loading ? (
            <p
              className="d-flex align-items-center justify-content-center text-center rounded-circle"
              style={{
                width: "90px",
                height: "90px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              loading
            </p>
          ) : (
            <div className="dropdown btn-group">
              <img
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
                src={currentUser?.avatarURL ? currentUser.avatarURL : avatar}
                alt=""
                style={{ width: "90px", height: "90px" }}
                className="rounded-circle"
              />

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
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => deleteAvatar(currentUser?.uId)}
                    >
                      إزلة
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {currentUser && (
          <h4 className="mt-2 fs-5 px-3">{currentUser.displayName} </h4>
        )}
      </div>

      <ul className="user-profile-taps nav nav-pills nav-fill row row-cols-1 ">
        <li className="nav-item col">
          <NavLink className="nav-link" end to={"/seller/profile"}>
            حسابي
          </NavLink>
        </li>
        <li className="nav-item col">
          <NavLink className="nav-link" to={"./products"}>
            المنتجات
          </NavLink>
        </li>
        <li className="nav-item col">
          <NavLink className="nav-link" to={"./posts"}>
            المنشورات
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
