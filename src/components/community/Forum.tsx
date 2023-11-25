import { useCollectionData } from "react-firebase-hooks/firestore";
import Modal from "./Modal";
import Post from "./Post";
import { postsCollRef } from "../../firebase/firebase";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Spinner } from "../Spinner/Spinner";
import { useState } from "react";

export default function Forum() {
  const [posts, loading, error] = useCollectionData(postsCollRef);
  const [loadingPost, setLoadingPost] = useState(false);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <Modal setLoadingPost={setLoadingPost} />
          <div className="col-12">
            {loading ? (
              <div className="d-flex justify-content-center mt-4">
                <Spinner />
              </div>
            ) : loadingPost ? (
              <div className="d-flex justify-content-center">
                <Spinner />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-12">
            {posts
              ?.sort((a, b) => +b.genratedAt - +a.genratedAt)
              .map((post) => (
                <Post post={post} key={post.postId} />
              ))}
          </div>
        </div>
      </div>
      {/* <Container sx={{ paddingY: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {loading ? (
            <div className="h-100 ">
              <Spinner />
            </div>
          ) : (
            <Grid
              container
              spacing={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {loadingPost ? (
                <div className="d-flex justify-content-center">
                  <Spinner />
                </div>
              ) : (
                ""
              )}

              {posts
                ?.sort((a, b) => +b.genratedAt - +a.genratedAt)
                .map((post) => (
                  <Post post={post} key={post.postId} />
                ))}
            </Grid>
          )}
        </Grid>
      </Container> */}
    </>
  );
}
