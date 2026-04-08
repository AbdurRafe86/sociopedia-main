import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1.2rem",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
  border: `1px solid rgba(${
    theme.palette.mode === "dark" ? "255, 255, 255" : "0, 0, 0"
  }, 0.05)`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.06)",
  },
}));

export default WidgetWrapper;
