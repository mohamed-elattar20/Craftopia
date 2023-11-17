import avatar from "../../../assets/images/User Profile/Avatar.png";
import { NavLink } from "react-router-dom";
import "./userProfileSections.css";
// Authentication
import { auth, firestore } from "../../../firebase/firebase";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { UserContext } from "../../../Contexts/UserContext";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../firebase/firebase.config";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { signOut } from "firebase/auth";

export const UserProfileSections = () => {
  //  Auth
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
    <div className="user-profile-sections d-none d-md-block">
      <div className="border pt-4 rounded-4">
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img mb-4">
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
              <div className="dropdown ">
                <img
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                  src={currentUser?.avatarURL ? currentUser.avatarURL : avatar}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
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

          {currentUser && (
            <h4 className="mt-2 fs-5 px-3">{currentUser.displayName} </h4>
          )}
        </div>

        {/* <div className="profile-img">
            {loading ? (
              <div
                className="d-flex align-items-center justify-content-center text-center rounded-circle"
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}
              >
                <p className="m-0">loading</p>
              </div>
            ) : (
              <div>
                {currentUser === undefined ? (
                  <div
                    className="d-flex align-items-center justify-content-center text-center rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <p className="m-0">loading</p>
                  </div>
                ) : (
                  <div>
                    <div>
                      <label className="d-none" htmlFor="profile-pic">
                        تحديث
                      </label>
                      <input
                        type="file"
                        hidden
                        id="profile-pic"
                        onChange={(event) => uploadAvatar(event)}
                      />
                      {currentUser?.avatarURL && (
                        <span
                          className="delete-avatar rounded-circle position-absolute d-none"
                          onClick={() => deleteAvatar(currentUser?.uId)}
                        >
                          x
                        </span>
                      )}
                    </div>

                    {currentUser && currentUser.avatarURL ? (
                      <img
                        src={currentUser?.avatarURL}
                        alt=""
                        style={{ width: "100px" }}
                      />
                    ) : (
                      <img src={avatar} alt="" style={{ width: "100px" }} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div> */}

        {/* <h4 className="mt-2 fs-5">{currentUser?.displayName} </h4>
        </div> */}

        <ul className="mt-4 mb-0 d-flex flex-column p-0 ">
          <li>
            <NavLink end to={"/user/profile"}>
              حسابي
            </NavLink>
          </li>
          <li>
            <NavLink to={"./orders"}>الطلبات</NavLink>
          </li>
          <li>
            <NavLink to={"./wishlist"}>المنتجات المفضلة</NavLink>
          </li>
          <li>
            <NavLink to={"./posts"}>المنشورات</NavLink>
          </li>
        </ul>
        <div className="text-center border-top ">
          <NavLink onClick={() => signOut(auth)} to={"/"}>
            تسجيل الخروج
          </NavLink>
        </div>
      </div>
    </div>
  );
};
