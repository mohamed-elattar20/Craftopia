// Assest
import avatar from "../../assets/images/User Profile/Avatar.png";
// Components
import { CommentType } from "./Post";
import { UserContext } from "../../Contexts/UserContext";
// FireBase
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
// React
import { useContext } from "react";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faTrash,
  faTrashAlt,
  faCartPlus,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
type Comment = {
  comment: CommentType;
};
const Comment = ({ comment }: Comment) => {
  const { currentUser } = useContext(UserContext);
  // ******************************************************
  const deleteComment = async (commentId: string) => {
    const res = await deleteDoc(doc(firestore, "comments", comment.commentId));
    // console.log(res);
  };
  // console.log(comment);

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
                <p
                  style={{ fontSize: "11.2px" }}
                  className="me-3 fw-bold text-muted m-0 "
                >
                  {new Date(comment.generatedAt.toDate()).toDateString()}
                </p>

                <p className="lead">{comment.commentBody}</p>
              </div>
              <div>
                {comment.userId === currentUser?.uId && (
                  <button
                    onClick={() => deleteComment(comment.commentId)}
                    className="btn btn-secondary"
                  >
                    {" "}
                    <FontAwesomeIcon icon={faTrashAlt} />
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
