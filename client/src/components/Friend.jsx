import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFriends, setNotification } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { API_BASE_URL } from "config";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${_id}/friend-action/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        dispatch(setFriends({ friends: data }));
        dispatch(
          setNotification({
            message: isFriend 
              ? `Removed ${name} from friends.` 
              : `Successfully added ${name} to friends! ✨`,
            type: isFriend ? "info" : "success",
          })
        );
      } else {
        throw new Error(data.message || "Failed to update friend status.");
      }
    } catch (err) {
      dispatch(
        setNotification({
          message: err.message || "An error occurred. Please try again.",
          type: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="700"
            sx={{
              letterSpacing: "-0.5px",
              "&:hover": {
                color: palette.primary.main,
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem" fontWeight="500">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== _id && (
        <IconButton
          onClick={() => patchFriend()}
          disabled={isLoading}
          sx={{ 
            backgroundColor: primaryLight, 
            p: "0.6rem",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: primaryDark,
              "& svg": { color: "#fff" }
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: primaryDark }} />
          ) : isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
