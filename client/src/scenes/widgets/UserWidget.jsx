import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "config";
import EditProfileModal from "./EditProfileModal";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);
  
  const isSelf = loggedInUser?._id === userId;

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    // If it's the logged in user, keep it in sync with the global state
    if (isSelf && loggedInUser) {
      setUser(loggedInUser);
    } else {
      getUser();
    }
  }, [isSelf, loggedInUser, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName = "Social",
    lastName = "Member",
    location = "Global Citizen",
    occupation = "Explorer",
    viewedProfile = 0,
    impressions = 0,
    friends = [],
    twitterUrl = "https://twitter.com",
    linkedinUrl = "https://linkedin.com",
  } = user;

  const socialIconStyle = { 
    width: "28px", 
    height: "28px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": { transform: "scale(1.1)" }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (isSelf) {
      setIsEditModalOpen(true);
    }
  };

  return (
    <>
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="700"
                sx={{
                  letterSpacing: "-0.5px",
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium} fontWeight="500">
                {friends.length} friends
              </Typography>
            </Box>
          </FlexBetween>
          {isSelf && (
            <IconButton 
              sx={{ backgroundColor: palette.neutral.light }}
              onClick={handleEditClick}
            >
              <ManageAccountsOutlined sx={{ color: dark }} />
            </IconButton>
          )}
        </FlexBetween>

        <Divider />

        {/* SECOND ROW */}
        <Box p="1.2rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.75rem">
            <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium} fontWeight="500">
              {location}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium} fontWeight="500">
              {occupation}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* FOURTH ROW */}
        <Box p="1.2rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="700" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween 
            gap="1rem" 
            mb="0.8rem" 
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            onClick={() => window.open(twitterUrl, "_blank")}
          >
            <FlexBetween gap="1rem">
              <Box
                component="img"
                src="/assets/twitter.png"
                alt="twitter"
                sx={socialIconStyle}
              />
              <Box>
                <Typography color={main} fontWeight="600">
                  Twitter
                </Typography>
                <Typography color={medium} fontSize="0.8rem">
                  Social Network
                </Typography>
              </Box>
            </FlexBetween>
            {isSelf && (
              <IconButton onClick={handleEditClick}>
                <EditOutlined sx={{ color: main }} />
              </IconButton>
            )}
          </FlexBetween>

          <FlexBetween 
            gap="1rem"
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            onClick={() => window.open(linkedinUrl, "_blank")}
          >
            <FlexBetween gap="1rem">
              <Box
                component="img"
                src="/assets/linkedin.png"
                alt="linkedin"
                sx={socialIconStyle}
              />
              <Box>
                <Typography color={main} fontWeight="600">
                  Linkedin
                </Typography>
                <Typography color={medium} fontSize="0.8rem">
                  Network Platform
                </Typography>
              </Box>
            </FlexBetween>
            {isSelf && (
              <IconButton onClick={handleEditClick}>
                <EditOutlined sx={{ color: main }} />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      </WidgetWrapper>

      {/* EDIT MODAL */}
      {isSelf && (
        <EditProfileModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />
      )}
    </>
  );
};

export default UserWidget;
