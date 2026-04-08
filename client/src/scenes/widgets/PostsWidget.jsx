import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { API_BASE_URL } from "config";
import { Typography, Box, CircularProgress, useTheme } from "@mui/material";
import { PostAddOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const getPosts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setPosts({ posts: data }));
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  }, [token, dispatch]);

  const getUserPosts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setPosts({ posts: data }));
      }
    } catch (err) {
      console.error("Failed to fetch user posts:", err);
    }
  }, [userId, token, dispatch]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, getPosts, getUserPosts]);

  if (!Array.isArray(posts)) {
    return (
      <Box display="flex" justifyContent="center" p="2rem">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId: postUserId,
            firstName = "Anonymous",
            lastName = "User",
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={postUserId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <WidgetWrapper>
          <Box
            textAlign="center"
            p="3rem"
            sx={{
              backgroundColor: palette.background.default,
              borderRadius: "1rem",
              border: `1px dashed ${palette.neutral.medium}`,
            }}
          >
            <PostAddOutlined sx={{ fontSize: "3rem", color: palette.neutral.medium, mb: "1rem" }} />
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="700" mb="0.5rem">
              The feed is quiet.
            </Typography>
            <Typography color={palette.neutral.medium} variant="body1">
              Be the first to share a moment with the community!
            </Typography>
          </Box>
        </WidgetWrapper>
      )}
    </>
  );
};

export default PostsWidget;
