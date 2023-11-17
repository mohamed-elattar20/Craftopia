import test from "../../assets/images/default.jpg";
import "./Community.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { Stack, Typography, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import UserAddCommentForm from "./UserAddCommentForm";
import {
  DocumentData,
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  commentsCollRef,
  firestore,
  postsCollRef,
} from "../../firebase/firebase";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { UserContext } from "../../Contexts/UserContext";
import avatar from "../../assets/images/User Profile/Avatar.png";
import Comment from "./Comment";

type PostType = {
  genratedAt: Timestamp;
  postBody: string;
  postBodyImages: { imageUrl: string; imageId: string }[];
  postOwnerAvatarUrl: string;
  postOwnerName: string;
  postOwnerId: string;
};

export type CommentType = {
  commentBody: string;
  commentId: string;
  generatedAt: Timestamp;
  postId: string;
  userAvatarUrl: string;
  userId: string;
  userName: string;
  commentImgUrl: string;
};
export default function Post({ post }: DocumentData) {
  // console.log(post);

  const [isOpen, setIsOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const { authUser } = useContext(UserContext);

  const togglesVotes = (postId: any) => {
    const postRef = doc(firestore, "posts", post.postId);
    if (authUser && post.votes[authUser[0].uId]) {
      const updatedVotes = post.votes;
      delete updatedVotes[authUser[0].uId];

      updateDoc(postRef, {
        ...post,
        votes: { ...updatedVotes },
      });
    } else {
      if (authUser) {
        updateDoc(postRef, {
          ...post,
          votes: {
            ...post.votes,
            [authUser[0].uId]: true,
          },
        });
      }
    }
    setHasVoted((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (authUser && post.votes[authUser[0].uId]) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  }, [post, authUser]);
  //  *************************************************************
  const listOfComments = query(
    commentsCollRef,
    where("postId", "==", post?.postId)
  );
  const [comments, loading, error] = useCollectionData(listOfComments); // *******************************

  const [commentState, setCommentState] = useState<Boolean>(false);

  return (
    <>
      <Grid item xs={7} sx={{ margin: "1rem 0" }}>
        <Item>
          <Paper elevation={8}>
            <Stack direction={"column"}>
              <Box>
                <Box>
                  <img
                    style={{ objectFit: "cover" }}
                    className="item-img"
                    src={post.postBodyImages[0].imageUrl}
                    alt=""
                  />
                </Box>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  sx={{ padding: 1, marginBottom: 2 }}
                >
                  <Box sx={{ height: "auto", marginLeft: "1rem" }}>
                    <img
                      src={
                        post.postOwnerAvatarUrl
                          ? post.postOwnerAvatarUrl
                          : avatar
                      }
                      alt=""
                      className="user-img"
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {post.postOwnerName}
                    </Typography>
                    <Box sx={{ opacity: 0.9 }}>
                      {post.genratedAt && (
                        <>
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              opacity: "0.7",
                            }}
                          >
                            {new Date(post.genratedAt.toDate()).toDateString()}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.6rem",
                              fontWeight: "bold",
                              opacity: "0.6",
                            }}
                          >
                            {new Date(
                              post.genratedAt.toDate()
                            ).toLocaleTimeString()}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Stack>
                <Typography
                  sx={{ fontSize: "1.1rem", marginBottom: 1, padding: 1 }}
                >
                  {post.postBody}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ marginBottom: 1, padding: 1 }}
                >
                  <Button
                    sx={{
                      minWidth: 0,
                      padding: 0,
                      marginLeft: 3,
                      fontFamily: "inherit",
                    }}
                    onClick={() => togglesVotes(post.postId)}
                  >
                    <FontAwesomeIcon
                      icon={faArrowUpLong}
                      color={hasVoted ? "blue" : "gray"}
                      style={{ fontSize: 20, marginLeft: 3 }}
                    />
                    {/* <span>{Object.keys(post.votes).length}</span> */}

                    <Typography
                      sx={{
                        marginRight: 1,
                        fontFamily: "inherit",
                        color: "#000",
                      }}
                    >
                      اعجاب
                    </Typography>
                  </Button>
                  {post.votes > 0 && (
                    <Typography>نال اعجاب {post.votes}</Typography>
                  )}
                  <Button
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                    sx={{ minWidth: 0, padding: 0, fontFamily: "inherit" }}
                  >
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      color="gray"
                      style={{ fontSize: 25 }}
                    />
                    <Typography
                      sx={{
                        paddingX: 1.5,
                        fontFamily: "inherit",
                        color: "#000",
                      }}
                    >
                      تعليق
                    </Typography>
                  </Button>
                </Stack>
                <Box padding={1}>
                  {isOpen && <UserAddCommentForm post={post} />}
                </Box>
                {/* Comments ****************************************** */}
                {loading ? (
                  <h1 className="display-1">Loading</h1>
                ) : (
                  comments
                    ?.slice(0, 3)
                    .map((comment) => (
                      <Comment
                        key={comment.commentId}
                        comment={comment as CommentType}
                      />
                    ))
                )}
                {/* {comments?.slice(0, 3).map((comment) => (
                  <Comment
                    key={comment.commentId}
                    comment={comment as CommentType}
                  />
                ))} */}
                {comments && comments?.length > 3 && (
                  <>
                    {!commentState ? (
                      <button
                        onClick={() => setCommentState(true)}
                        className="btn fs-1"
                      >
                        أظهر المزيد
                      </button>
                    ) : (
                      ""
                    )}
                    {commentState
                      ? comments
                          ?.slice(3)
                          .map((comment) => (
                            <Comment
                              key={comment.commentId}
                              comment={comment as CommentType}
                            />
                          ))
                      : ""}
                  </>
                )}
              </Box>
            </Stack>
          </Paper>
        </Item>
      </Grid>
    </>
  );
}
