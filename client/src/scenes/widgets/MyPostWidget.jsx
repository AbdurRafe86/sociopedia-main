import {
  EditOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  LayersOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setNotification } from "state";
import { API_BASE_URL } from "config";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      if (!post.trim() && !image) {
        dispatch(
          setNotification({
            message: "Please add some content or an image to post.",
            type: "warning",
          })
        );
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);

      let finalPicturePath = "";

      if (image) {
        formData.append("image", image);
        const imgbbKey = process.env.REACT_APP_IMGBB_API_KEY;
        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.success) {
          finalPicturePath = imgbbData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: _id,
          description: post,
          picturePath: finalPicturePath,
        }),
      });

      const posts = await response.json();
      if (response.ok) {
        dispatch(setPosts({ posts }));
        dispatch(
          setNotification({
            message: "Post created successfully! 🚀",
            type: "success",
          })
        );
        setImage(null);
        setPost("");
        setIsImage(false);
      } else {
        throw new Error(posts.message || "Failed to create post");
      }
    } catch (err) {
      dispatch(
        setNotification({
          message: err.message || "Something went wrong. Please try again.",
          type: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind? Share your thoughts..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: palette.neutral.light,
              boxShadow: "0 0 0 2px " + palette.primary.light,
            },
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="12px"
          mt="1.5rem"
          p="1rem"
          sx={{ backgroundColor: palette.background.default }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="2rem"
                  width="100%"
                  sx={{
                    "&:hover": { cursor: "pointer", opacity: 0.8 },
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={mediumMain} fontWeight="500">
                      Drag & drop or <span style={{ color: palette.primary.main, textDecoration: "underline" }}>browse</span> to add an image
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography fontWeight="600" color={palette.primary.main}>
                        {image.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ ml: "0.5rem" }}
                  >
                    <DeleteOutlined color="error" />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.5rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <IconButton>
            <ImageOutlined sx={{ color: mediumMain }} />
          </IconButton>
          <Typography
            color={mediumMain}
            fontWeight="600"
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Photo
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <Tooltip title="Coming Soon">
              <FlexBetween gap="0.25rem" sx={{ opacity: 0.6 }}>
                <IconButton disabled>
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                </IconButton>
                <Typography color={mediumMain} fontWeight="600">Clip</Typography>
              </FlexBetween>
            </Tooltip>

            <Tooltip title="Coming Soon">
              <FlexBetween gap="0.25rem" sx={{ opacity: 0.6 }}>
                <IconButton disabled>
                  <LayersOutlined sx={{ color: mediumMain }} />
                </IconButton>
                <Typography color={mediumMain} fontWeight="600">Event</Typography>
              </FlexBetween>
            </Tooltip>

            <Tooltip title="Coming Soon">
              <FlexBetween gap="0.25rem" sx={{ opacity: 0.6 }}>
                <IconButton disabled>
                  <MicOutlined sx={{ color: mediumMain }} />
                </IconButton>
                <Typography color={mediumMain} fontWeight="600">Audio</Typography>
              </FlexBetween>
            </Tooltip>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={(!post.trim() && !image) || isLoading}
          onClick={handlePost}
          sx={{
            color: "#fff",
            backgroundColor: palette.primary.main,
            borderRadius: "2rem",
            padding: "0.5rem 2rem",
            fontWeight: "700",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 14px 0 " + palette.primary.main + "40",
            "&:hover": {
              backgroundColor: palette.primary.dark,
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px 0 " + palette.primary.main + "60",
            },
            "&:disabled": {
              backgroundColor: palette.neutral.light,
              color: palette.neutral.medium,
            },
          }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "POST"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
