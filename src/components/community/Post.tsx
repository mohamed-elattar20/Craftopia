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
import { firestore, postsCollRef } from "../../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserContext } from "../../Contexts/UserContext";
import avatar from "../../assets/images/User Profile/Avatar.png";

type PostType = {
  genratedAt: Timestamp;
  postBody: string;
  postBodyImages: { imageUrl: string; imageId: string }[];
  postOwnerAvatarUrl: string;
  postOwnerName: string;
};

export default function Post({ post }: DocumentData) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const { authUser } = useContext(UserContext);

  const postQ = query(postsCollRef, where("postId", "==", post.postId));
  console.log(postQ);
  let postDoc: any;
  const unsubscribe = onSnapshot(postQ, (querySnapshot: any) => {
    postDoc = querySnapshot.docs[0];
  });

  const togglesVotes = (postId: any) => {
    const postRef = doc(firestore, "posts", postDoc.id);
    if (authUser && postDoc.data().votes[authUser[0].uId]) {
      const updatedVotes = postDoc.data().votes;
      delete updatedVotes[authUser[0].uId];

      updateDoc(postRef, {
        ...postDoc.data(),
        votes: { ...updatedVotes },
      });
    } else {
      if (authUser) {
        updateDoc(postRef, {
          ...postDoc.data(),
          votes: {
            ...postDoc.data().votes,
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

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Item>
        <Paper elevation={8}>
          <Stack direction={"column"}>
            <Box sx={{ padding: 1 }}>
              <img
                className="item-img"
                src={post.postBodyImages[0].imageUrl}
                alt=""
              />
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                sx={{ paddingY: 1, marginBottom: 2 }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {post.postOwnerName}
                  </Typography>
                  <Typography sx={{ opacity: 0.9 }}>
                    {post.genratedAt &&
                      new Date(post.genratedAt.toDate()).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ height: "auto" }}>
                  <img
                    src={
                      post.postOwnerAvatarUrl ? post.postOwnerAvatarUrl : avatar
                    }
                    alt=""
                    className="user-img"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Stack>
              <Typography sx={{ fontSize: "1.1rem", marginBottom: 1 }}>
                {post.postBody}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                sx={{ marginBottom: 1 }}
              >
                <Button
                  sx={{
                    minWidth: 0,
                    padding: 0,
                    marginLeft: 3,
                  }}
                  onClick={() => togglesVotes(post.postId)}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpLong}
                    color={hasVoted ? "blue" : "gray"}
                    style={{ fontSize: 20, marginLeft: 5 }}
                  />
                  <span>{Object.keys(post.votes).length}</span>

                  <Typography sx={{ color: "#191970" }}>اعجاب</Typography>
                </Button>
                {post.votes > 0 && <span>{post.votes}</span>}
                <Button
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                  sx={{ minWidth: 0, padding: 0 }}
                >
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    color="gray"
                    style={{ fontSize: 25 }}
                  />
                  <Typography sx={{ color: "#191970", paddingX: 1.5 }}>
                    تعليق
                  </Typography>
                </Button>
              </Stack>
              <Box>{isOpen && <UserAddCommentForm />}</Box>
            </Box>
          </Stack>
        </Paper>
      </Item>
    </Grid>
  );
}
