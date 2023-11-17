// Assest
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import avatar from "../../assets/images/User Profile/Avatar.png";
import { CommentType } from "./Post";
import { firestore } from "../../firebase/firebase";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

type Comment = {
  comment: CommentType;
};
const Comment = ({ comment }: Comment) => {
  const { currentUser } = useContext(UserContext);
  // ******************************************************
  const deleteComment = async (commentId: string) => {
    const res = await deleteDoc(doc(firestore, "comments", comment.commentId));
    console.log(res);
  };
  return (
    <>
      {comment.commentImgUrl ? (
        <>
          <div className="d-flex mt-1 p-2">
            <div>
              <img
                className="user-img"
                src={comment.userAvatarUrl || avatar}
                alt=""
              />
            </div>
            <div className="d-flex justify-content-between w-100 ">
              <div className="me-3">
                <h5>{comment.userName}</h5>
                <p>{comment.commentBody}</p>
              </div>
              <div>
                {comment.userId === currentUser?.uId && (
                  <button
                    onClick={() => deleteComment(comment.commentId)}
                    className="btn btn-primary"
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <img src={comment.commentImgUrl} alt="" />
          </div>
        </>
      ) : (
        <h1>Waiting for Comments</h1>
      )}
    </>
  );
};

export default Comment;
