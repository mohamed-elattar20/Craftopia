import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import { v4 } from "uuid";
import { Timestamp, addDoc, doc, setDoc } from "firebase/firestore";
import { firestore, postsCollRef } from "../../firebase/firebase";
import { UserContext } from "../../Contexts/UserContext";

export default function UserAddProductForm({ setLoadingPost }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    reset,
  } = useForm();
  const [uploadFile, uploading, , errorUploading] = useUploadFile();

  const [imgs, setImgs] = useState<any>([]);
  const { authUser } = useContext(UserContext);

  const submitControl = async (data: any) => {
    console.log(data);
    setLoadingPost(true);

    const uploadPromises = imgs.map(async (img: any) => {
      const imgRef = ref(storage, `posts/${img.imageId}`);
      await uploadFile(imgRef, img.postImg);
      const url = await getDownloadURL(imgRef);
      img.imageUrl = url;
      delete img.postImg;
    });
    await Promise.all(uploadPromises);

    if (authUser) {
      const postId = crypto.randomUUID();
      console.log(imgs);
      await setDoc(doc(firestore, "posts", postId), {
        postId: postId,
        postBody: data.addComment,
        postBodyImages: imgs.length > 0 ? imgs : [],
        postOwnerName: authUser[0].displayName,
        postOwnerAvatarUrl: authUser[0].avatarURL || "",
        genratedAt: Timestamp.now(),
        votes: 0,
        postOwnerId: authUser[0].uId,
      })
        .then(() => {
          console.log(`Set Post Added **************************`);
        })
        .catch(() => {
          console.log(`Set post not Added`);
        });
    }
    setLoadingPost(false);
    reset();
    setImgs([]);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let postImg = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(postImg);

      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        const imageId = crypto.randomUUID();
        setImgs((prev: any) => [...prev, { imageUrl, imageId, postImg }]);
      };
      console.log(imgs);
    }
  };

  const deleteImg = (img: any) => {
    setImgs((prev: any) => prev.filter((image: any) => image !== img));
    if (imgs.length === 1) {
      setValue("add-img", null);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitControl)}>
      <div className="mb-3">
        <textarea
          placeholder="عن ماذا تبحث؟"
          className="form-control shadow-none"
          id="exampleFormControlTextarea1"
          rows={3}
          {...register("addComment", {
            required: "رجاء اكتب  توضيح لطلبك",
          })}
        ></textarea>
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label btn btn-outline-gray"
        >
          اضافة صورة
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="exampleFormControlInput1"
          hidden
          {...register("add-img", {
            onChange: (event) => handleUpload(event),
          })}
        />
      </div>
      <div className="d-flex gap-3">
        {imgs?.length > 0 &&
          imgs?.map((img: any) => (
            <div key={img.imageId} className="position-relative">
              <img src={img.imageUrl} alt="" style={{ width: "100px" }} />
              <span
                className="fw-bold btn btn-danger position-absolute top-0 start-100 rounded-circle p-0 d-flex justify-content-center align-items-center translate-middle"
                style={{ width: "22px", height: "22px" }}
                onClick={() => deleteImg(img)}
              >
                x
              </span>
            </div>
          ))}
      </div>

      <div className="modal-footer d-flex">
        <button
          type="submit"
          className="btn btn-secondary flex-grow-1"
          disabled={!isValid}
          data-bs-dismiss={isValid ? "modal" : ""}
        >
          نشر
        </button>
        <button
          type="button"
          className="btn btn-outline-gray"
          data-bs-dismiss="modal"
          onClick={() => {
            reset();
            setImgs([]);
          }}
        >
          غلق
        </button>
      </div>
    </form>
  );
}
