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

export default function UserAddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm();
  const [uploadFile, uploading, , errorUploading] = useUploadFile();

  const [imgs, setImgs] = useState<any>([]);
  const { authUser } = useContext(UserContext);

  const submitControl = async (data: any) => {
    imgs.forEach(async (img: any) => {
      const imgRef = ref(storage, `posts/${img.imageId}`);
      await uploadFile(imgRef, img.postImg);
      const url = await getDownloadURL(imgRef);
      img.imageUrl = url;
      delete img.postImg;

      if (authUser) {
        const postId = crypto.randomUUID();
        console.log(imgs);
        setDoc(doc(firestore, "posts", postId), {
          postId: postId,
          postBody: data.addComment,
          postBodyImages: imgs,
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
        // addDoc(postsCollRef, {
        //   postId: crypto.randomUUID(),
        //   postBody: data.addComment,
        //   postBodyImages: imgs,
        //   postOwnerName: authUser[0].displayName,
        //   postOwnerAvatarUrl: authUser[0].avatarURL || "",
        //   genratedAt: Timestamp.now(),
        //   votes: 0,
        //   comments: [],
        // });
      }
    });

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
        <label htmlFor="exampleFormControlInput1" className="form-label">
          اضافة صورة المنتج
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="exampleFormControlInput1"
          {...register("add-img", {
            required: "رجاء اضف صورة المنتج",
            validate: {
              hasValue: (file) => file !== null,
            },
            onChange: (event) => handleUpload(event),
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="add-img" />
        </small>

        {imgs?.length > 0 &&
          imgs?.map((img: any) => (
            <div key={img.imageId}>
              <img src={img.imageUrl} alt="" />
              <span onClick={() => deleteImg(img)}>x</span>
            </div>
          ))}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          اضافة تعليق
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          {...register("addComment", {
            required: "رجاء اكتب  توضيح لطلبك",
          })}
        ></textarea>
        <small className="text-danger">
          <ErrorMessage errors={errors} name="addComment" />
        </small>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => {
            reset();
            setImgs([]);
          }}
        >
          اغلاق
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-dismiss={isValid ? "modal" : ""}
        >
          اضافة
        </button>
      </div>
    </form>
  );
}
