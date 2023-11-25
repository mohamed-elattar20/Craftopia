import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Timestamp, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore, postsCollRef } from "../../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import { useUploadFile } from "react-firebase-hooks/storage";

type CommentImg = {
  imgId: string;
  imgUrl: any;
  imgFile: File;
};
type UserAddCommentFormProps = {
  post?: any;
  setIsOpen: any;
};
export default function UserAddCommentForm({
  post,
  setIsOpen,
}: UserAddCommentFormProps) {
  const { myUser, authUser } = useContext(UserContext);
  const [img, setImg] = useState<CommentImg>({} as CommentImg);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //  *************************************************************************
  const [uploadFile] = useUploadFile();

  //  *************************************************************************
  // const [load, setLoad] = useState<Boolean>(true);
  const submitControl = async (data: any) => {
    // console.log(data);
    const imgId = crypto.randomUUID();
    const imgRef = ref(storage, `posts/${imgId}`);
    const imgFile = img.imgFile;
    setImg({} as CommentImg);
    await uploadFile(imgRef, imgFile);
    const url = await getDownloadURL(imgRef);

    // ****************************
    if (authUser) {
      const commentId = crypto.randomUUID();
      const commentRef = doc(firestore, "comments", commentId);
      setDoc(commentRef, {
        commentBody: data.comment,
        commentId,
        postId: post && post?.postId,
        generatedAt: Timestamp.now(),
        userId: authUser[0].uId,
        userName: authUser[0].displayName,
        userAvatarUrl: authUser[0].avatarURL || "",
        commentImgUrl: url,
        userRole: authUser[0].Rule,
      }).then(() => {
        // setLoad(false);
      });
    }

    reset();
    setIsOpen(false);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files && e.target.files[0]);
    // **********************************************************************
    if (e.target.files) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        const imageId = crypto.randomUUID();
        if (imageUrl) {
          setImg({ imgUrl: imageUrl, imgId: imageId, imgFile });
        }
      };
    }
  };

  return (
    <form onSubmit={handleSubmit(submitControl)}>
      <div className="d-flex mt-3 gap-3">
        <div className="flex-grow-1 position-relative border rounded-2 pb-5">
          <textarea
            className="form-control add-comment w-100 border-0 shadow-none "
            id="exampleFormControlTextarea1"
            rows={2}
            placeholder="أضف تعليقك"
            {...register("comment", {
              required: "رجاء اكتب  تعليقك ",
            })}
          ></textarea>
          <div className="position-absolute bottom-0 p-2 d-flex justify-content-between w-100 align-items-end">
            <button
              type="submit"
              className="btn btn-secondary border-0 p-2 px-4"
              style={{ fontSize: "14px", lineHeight: "1" }}
            >
              تعليق
            </button>
            <div>
              <label
                htmlFor="comment-img"
                className="btn btn-outline-gray p-2"
                style={{ fontSize: "14px", lineHeight: "1" }}
              >
                إضافة صورة
              </label>
              <input
                id="comment-img"
                type="file"
                hidden
                onChange={(e) => handleUpload(e)}
              />
            </div>{" "}
          </div>
        </div>
      </div>
      {img.imgUrl && (
        <div className="my-3" style={{ width: "200px" }}>
          <img src={img.imgUrl} alt="" />
          {img.imgUrl && (
            <button
              onClick={() => setImg({} as CommentImg)}
              className="btn btn-danger my-3"
            >
              X
            </button>
          )}
        </div>
      )}
      <small className="text-danger">
        <ErrorMessage errors={errors} name="add-comment" />
      </small>
    </form>
  );
}
