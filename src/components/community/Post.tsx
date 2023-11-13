import test from "../../assets/images/default.jpg";
import "./Community.css";
import { useState } from "react";
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

export default function Post() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container sx={{ paddingY: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <Item>
            <Paper elevation={8}>
              <Stack direction={"column"}>
                <Box sx={{ padding: 1 }}>
                  <img className="item-img" src={test} alt="" />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    sx={{ paddingY: 1, marginBottom: 2 }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        احمد حلمي
                      </Typography>
                      <Typography sx={{ opacity: 0.9 }}>منذ يومين</Typography>
                    </Box>
                    <Box sx={{ height: "auto" }}>
                      <img
                        src={test}
                        alt=""
                        className="user-img"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "1.1rem", marginBottom: 1 }}>
                    ممكن حد يعملي السكارف ده؟ وهتكون التكلفة كام تقريبا ؟
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
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpLong}
                        color="#191970"
                        style={{ fontSize: 20, marginLeft: 5 }}
                      />
                      <Typography sx={{ color: "#191970" }}>اعجاب</Typography>
                    </Button>
                    <Button
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                      sx={{ minWidth: 0, padding: 0 }}
                    >
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        color="#191970"
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
        <Grid item xs={12} sm={6} lg={4}>
          <Item>
            <Paper elevation={8}>
              <Stack direction={"column"}>
                <Box sx={{ padding: 1 }}>
                  <img className="item-img" src={test} alt="" />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    sx={{ paddingY: 1, marginBottom: 2 }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        احمد حلمي
                      </Typography>
                      <Typography sx={{ opacity: 0.8 }}>منذ يومين</Typography>
                    </Box>
                    <Box sx={{ height: "auto" }}>
                      <img
                        src={test}
                        alt=""
                        className="user-img"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "1.1rem", marginBottom: 1 }}>
                    ممكن حد يعملي السكارف ده؟ وهتكون التكلفة كام تقريبا ؟
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
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpLong}
                        color="#191970"
                        style={{ fontSize: 20, marginLeft: 5 }}
                      />
                      <Typography sx={{ color: "#191970" }}>اعجاب</Typography>
                    </Button>
                    <Button
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                      sx={{ minWidth: 0, padding: 0 }}
                    >
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        color="#191970"
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
      </Grid>
    </Container>
  );
}
