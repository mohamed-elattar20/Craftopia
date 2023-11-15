import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { postsCollRef } from "../../../firebase/firebase";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import Post from "../../../components/community/Post";

const SellerProfilePosts = () => {
  const { myUser, authUser } = useContext(UserContext);
  let userPosts: any;
  if (authUser && authUser[0]) {
    userPosts = query(
      postsCollRef,
      where("postOwnerId", "==", authUser[0].uId)
    );
  }
  const [posts, loading, error] = useCollectionData(userPosts);
  return <>{posts && posts.map((post) => <Post post={post} />)}</>;
};

export default SellerProfilePosts;
