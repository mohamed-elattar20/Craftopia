import { NavLink } from "react-router-dom";
import avatar from "../../../assets/images/User Profile/Avatar.png";
// Authentication
import { auth, firestore } from "../../../firebase/firebase";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { UserContext } from "../../../Contexts/UserContext";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../firebase/firebase";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { signOut } from "firebase/auth";
import { Spinner } from "../../../components/Spinner/Spinner";

export const SellerProfileTaps = () => {
  const { currentUser } = useContext(UserContext);
  const [uploadFile] = useUploadFile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setError(null);
    const avatar = e.target.files && e.target.files[0];
    const avatarRef = currentUser && ref(storage, `avatars/${currentUser.uId}`);
    try {
      if (avatarRef && avatar) {
        await uploadFile(avatarRef, avatar, {
          contentType: avatar.type,
        });
        const url = await getDownloadURL(avatarRef);
        if (url) {
          console.log(url);
          const userDocRef = doc(firestore, "users", currentUser.uId);
          userDocRef &&
            updateDoc(userDocRef, {
              ...currentUser,
              avatarURL: url,
            });
        } else {
          setError("Failed to get avatar URL");
          throw new Error("Failed to get avatar URL");
        }
      }
    } catch (err) {
      setError("Error try again");
    }

    setLoading(false);
  };

  const deleteAvatar = async (id: string) => {
    setLoading(true);
    try {
      await deleteObject(ref(storage, `avatars/${id}`));
      await updateDoc(doc(firestore, "users", id), {
        ...currentUser,
        avatarURL: "",
      });
    } catch (err) {
      setError("Error try again");
    }
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
          {error && <p>{error}</p>}
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center text-center rounded-circle"
              style={{
                width: "100px",
                height: "100px",
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div className="dropdown">
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
                  <label htmlFor="profile-pic1">تحديث</label>
                  <input
                    id="profile-pic1"
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
