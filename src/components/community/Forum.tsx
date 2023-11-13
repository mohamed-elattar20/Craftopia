import { useCollectionData } from "react-firebase-hooks/firestore";
import Modal from "./Modal";
import Post from "./Post";
import { postsCollRef } from "../../firebase/firebase";

export default function Forum() {
  const [posts, loading, error] = useCollectionData(postsCollRef);

  return (
    <>
      <Modal />
      {posts?.map((post) => (
        <Post post={post} key={post.postId} />
      ))}
    </>
  );
}
