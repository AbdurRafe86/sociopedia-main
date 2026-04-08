import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
  SendOutlined,
} from "@mui/icons-material";
import { 
  Box, 
  Divider, 
  IconButton, 
  Typography, 
  useTheme, 
  InputBase,
  CircularProgress
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts, setNotification } from "state";
import { API_BASE_URL } from "config";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes && likes[loggedInUserId]);
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      if (response.ok) {
        dispatch(setPost({ post: updatedPost }));
        dispatch(
          setNotification({
            message: isLiked ? "Post unliked." : "You liked this post!",
            type: "info",
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setPosts({ posts: data }));
        dispatch(
          setNotification({
            message: "Post deleted successfully.",
            type: "success",
          })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setNotification({
          message: "Failed to delete post.",
          type: "error",
        })
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: commentText }),
      });
      const updatedPost = await response.json();
      if (response.ok) {
        dispatch(setPost({ post: updatedPost }));
        setCommentText("");
        dispatch(
          setNotification({
            message: "Comment added!",
            type: "success",
          })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setNotification({
          message: "Failed to add comment.",
          type: "error",
        })
      );
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "1rem", marginTop: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike} sx={{ transition: "all 0.2s" }}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography fontWeight="600">{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography fontWeight="600">{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.5rem">
          <IconButton>
            <ShareOutlined />
          </IconButton>
          {postUserId === loggedInUserId && (
            <IconButton onClick={deletePost} disabled={isDeleting}>
              {isDeleting ? <CircularProgress size={24} color="error" /> : <DeleteOutline color="error" />}
            </IconButton>
          )}
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="1rem" sx={{ transition: "all 0.5s ease" }}>
          <Divider />
          <Box mt="1rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`} sx={{ mb: "0.5rem" }}>
                <Box
                  sx={{
                    backgroundColor: palette.neutral.light,
                    borderRadius: "0.75rem",
                    p: "0.75rem 1rem",
                    display: "inline-block",
                    maxWidth: "90%",
                  }}
                >
                  <Typography sx={{ color: main, fontSize: "0.9rem" }}>
                    {comment}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ mt: "1rem" }} />
          <FlexBetween gap="1rem" mt="1rem">
            <InputBase
              placeholder="Write a comment..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
              }}
            />
            <IconButton 
              disabled={!commentText.trim() || isCommenting} 
              onClick={handleComment}
              sx={{
                backgroundColor: primary,
                color: "#fff",
                "&:hover": { backgroundColor: palette.primary.dark },
                "&:disabled": { backgroundColor: palette.neutral.medium }
              }}
            >
              {isCommenting ? <CircularProgress size={20} color="inherit" /> : <SendOutlined fontSize="small" />}
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
