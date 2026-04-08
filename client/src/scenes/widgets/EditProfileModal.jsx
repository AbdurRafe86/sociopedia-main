import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, updateUser } from "state";
import { API_BASE_URL } from "config";

const EditProfileModal = ({ open, onClose, user }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const [location, setLocation] = useState(user?.location || "");
  const [occupation, setOccupation] = useState(user?.occupation || "");
  const [twitterUrl, setTwitterUrl] = useState(user?.twitterUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user?._id}/profile-update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          occupation,
          twitterUrl,
          linkedinUrl,
        }),
      });

      const updatedUser = await response.json();
      
      if (response.ok) {
        dispatch(updateUser({ user: updatedUser }));
        dispatch(
          setNotification({
            message: "Profile updated successfully!",
            type: "success",
            open: true,
          })
        );
        onClose();
      } else {
        dispatch(
          setNotification({
            message: updatedUser.message || "Failed to update profile.",
            type: "error",
            open: true,
          })
        );
      }
    } catch (err) {
      dispatch(
        setNotification({
          message: "An error occurred.",
          type: "error",
          open: true,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const textFieldSx = {
    mb: "1.5rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: palette.neutral.medium,
      },
      "&:hover fieldset": {
        borderColor: palette.primary.main,
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: palette.background.default,
          backgroundImage: "none",
          borderRadius: "1rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" fontWeight="700" color={palette.neutral.dark}>
          Edit Profile
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: "2rem" }}>
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={textFieldSx}
        />
        <TextField
          fullWidth
          label="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          sx={textFieldSx}
        />
        <TextField
          fullWidth
          label="Twitter URL"
          placeholder="https://twitter.com/yourhandle"
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
          sx={textFieldSx}
        />
        <TextField
          fullWidth
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/yourhandle"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          sx={textFieldSx}
        />

        <Box display="flex" justifyContent="flex-end" gap="1rem" mt="1rem">
          <Button
            onClick={onClose}
            sx={{
              color: palette.neutral.dark,
              "&:hover": { backgroundColor: palette.neutral.light },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            sx={{
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              px: "2rem",
              "&:hover": { backgroundColor: palette.primary.dark },
            }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Changes"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
