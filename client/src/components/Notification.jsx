import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "state";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type, open } = useSelector((state) => state.notification);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setNotification({ message, type, open: false }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%", fontWeight: "500", borderRadius: "10px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
