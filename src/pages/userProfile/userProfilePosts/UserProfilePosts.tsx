import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, postsCollRef } from "../../../firebase/firebase";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { query, where } from "firebase/firestore";
import Post from "../../../components/community/Post";

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
        {posts && posts.map((post) => <Post post={post} key={post.postId} />)}
      </div>
    </>
  );
};
