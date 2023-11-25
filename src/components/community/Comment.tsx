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
import { NavLink } from "react-router-dom";
import { getPostTime } from "./Post";

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

  let currentDate = new Date().getTime();
  let postDate = new Date(comment.generatedAt.toDate()).getTime();
  let diff = (currentDate - postDate) / 1000;

  return (
    <>
      {comment.commentImgUrl ? (
        <>
          <div
            // style={{ borderTop: "0.1px solid #0000002b" }}
            className="d-flex pt-3 flex-column"
          >
            <div className="d-flex">
              <div>
                {comment.userRole === "seller" ? (
                  <NavLink to={`/products/${comment.userId}`}>
                    <img
                      className="user-img"
                      src={comment.userAvatarUrl || avatar}
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                  </NavLink>
                ) : (
                  <img
                    className="user-img"
                    src={comment.userAvatarUrl || avatar}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
              </div>
              <div
                className="me-2 d-flex justify-content-between w-100 p-2 rounded-3"
                style={{ backgroundColor: "#eee" }}
              >
                <div>
                  <h5 className="fs-6">
                    {comment.userName}
                    {comment.userRole === "seller" ? (
                      <span
                        className="badge text-bg-secondary fw-normal me-2 rounded-pill"
                        style={{ fontSize: "10px" }}
                      >
                        Seller
                      </span>
                    ) : (
                      ""
                    )}
                  </h5>
                  <p
                    style={{ fontSize: "11.2px" }}
                    className=" fw-bold text-muted m-0 "
                  >
                    {getPostTime(diff)}
                  </p>
                  <div className="mt-2">
                    <p className="m-0">{comment.commentBody}</p>
                  </div>

                  <div>
                    <img src={comment.commentImgUrl} alt="" />
                  </div>
                </div>
                <div>
                  {comment.userId === currentUser?.uId && (
                    <button
                      onClick={() => deleteComment(comment.commentId)}
                      className="btn"
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="text-danger"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="mt-2">
              <p className="m-0">{comment.commentBody}</p>
            </div>

            <div>
              <img src={comment.commentImgUrl} alt="" />
            </div> */}
          </div>
        </>
      ) : (
        <h1>Waiting for Comments</h1>
      )}
    </>
  );
};

export default Comment;
