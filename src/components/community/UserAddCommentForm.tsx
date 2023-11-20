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
};
export default function UserAddCommentForm({ post }: UserAddCommentFormProps) {
  const { myUser, authUser } = useContext(UserContext);
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
      }).then(() => {
        // setLoad(false);
      });
    }

    reset();
  };

  const [img, setImg] = useState<CommentImg>({} as CommentImg);

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
      <div className="d-flex align-items-center">
        <textarea
          className="form-control add-comment"
          id="exampleFormControlTextarea1"
          rows={1}
          {...register("comment", {
            required: "رجاء اكتب  تعليقك ",
          })}
        ></textarea>

        <button type="submit" className=" btn btn-primary border-0 p-2 ms-2 ">
          <p className="m-0">تعليق</p>
        </button>
        <input
          type="file"
          placeholder="أضف صورة"
          className="btn"
          onChange={(e) => handleUpload(e)}
        />
      </div>
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
      <small className="text-danger">
        <ErrorMessage errors={errors} name="add-comment" />
      </small>
    </form>
  );
}
