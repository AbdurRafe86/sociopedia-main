import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { API_BASE_URL } from "config";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const friends = user?.friends || [];

  const getFriends = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setFriends({ friends: data }));
      }
    } catch (err) {
      console.error("Failed to fetch friends:", err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="700"
        sx={{ mb: "1.5rem", letterSpacing: "-0.5px" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Box
            textAlign="center"
            p="2rem"
            sx={{
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              border: `1px dashed ${palette.neutral.medium}`,
            }}
          >
            <IconButton sx={{ mb: "0.5rem" }}>
              <PersonAddOutlined sx={{ fontSize: "2rem", color: palette.neutral.medium }} />
            </IconButton>
            <Typography color={palette.neutral.medium} variant="body1" fontWeight="500">
              Your circle is empty.
            </Typography>
            <Typography 
              color={palette.primary.main} 
              variant="body2" 
              sx={{ mt: "0.5rem", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            >
              Discover new people
            </Typography>
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
