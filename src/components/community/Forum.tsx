import { useCollectionData } from "react-firebase-hooks/firestore";
import Modal from "./Modal";
import Post from "./Post";
import { postsCollRef } from "../../firebase/firebase";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Forum() {
  const [posts, loading, error] = useCollectionData(postsCollRef);

  return (
    <>
      <Modal />
      <Container sx={{ paddingY: 3 }}>
        <Grid container spacing={3}>
          {posts?.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
