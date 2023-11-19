import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, postsCollRef } from "../../../firebase/firebase";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { query, where } from "firebase/firestore";
import Post from "../../../components/community/Post";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/Spinner/Spinner";

export const UserProfilePosts = () => {
  const { myUser, authUser } = useContext(UserContext);
  let userPosts: any;
  if (authUser && authUser[0]) {
    userPosts = query(
      postsCollRef,
      where("postOwnerId", "==", authUser[0].uId)
    );
  }
  const [posts, loading, error] = useCollectionData(userPosts);

  return (
    <>
      <div>
        {loading ? (
          <div className="h-100 d-flex justify-content-center">
            <Spinner />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => <Post post={post} key={post.postId} />)
        ) : (
          <>
            <h2 className="display-5">لا توجد منشورات خاصة بك في مجتمعنا</h2>
            <Link className="btn btn-primary" to={`/community`}>
              إضافة منشور
            </Link>
          </>
        )}
      </div>
    </>
  );
};
