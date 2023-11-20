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
          <div
            style={{ borderTop: "0.1px solid #0000002b" }}
            className="d-flex mt-1 p-2 py-3 flex-column  "
          >
            <div className={`d-flex mt-1 p-2 py-3 flex-column`}>
              <div className="d-flex">
                <div>
                  <img
                    className="user-img"
                    src={comment.userAvatarUrl || avatar}
                    alt=""
                  />
                </div>
                <div className="me-2 d-flex justify-content-between w-100 ">
                  <div>
                    <h5>{comment.userName}</h5>
                    <p
                      style={{ fontSize: "11.2px" }}
                      className="me-3 fw-bold text-muted m-0 "
                    >
                      {new Date(comment.generatedAt.toDate()).toDateString()}
                    </p>
                  </div>
                  <div>
                    {comment.userId === currentUser?.uId && (
                      <button
                        onClick={() => deleteComment(comment.commentId)}
                        className="btn btn-primary"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <p className="mt-2">{comment.commentBody}</p>
              </div>
            </div>
            <div>
              <img src={comment.commentImgUrl} alt="" />
            </div>
          </div>
        </>
      ) : (
        <h1>Waiting for Comments</h1>
      )}
    </>
  );
};

export default Comment;
