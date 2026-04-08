import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      minHeight="100vh"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at 20% 10%, rgba(26, 115, 232, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 90%, rgba(26, 115, 232, 0.05) 0%, transparent 40%)"
            : "radial-gradient(circle at 20% 10%, rgba(25, 118, 210, 0.02) 0%, transparent 40%), radial-gradient(circle at 80% 90%, rgba(25, 118, 210, 0.02) 0%, transparent 40%)",
      }}
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        sx={{
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(${
            theme.palette.mode === "dark" ? "255, 255, 255" : "0, 0, 0"
          }, 0.05)`,
        }}
      >
        <Typography
          fontWeight="800"
          fontSize="36px"
          color="primary"
          sx={{ letterSpacing: "-1px" }}
        >
          Sociopedia.
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "450px" : "90%"}
        p="3rem"
        m="4rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          border: `1px solid rgba(${
            theme.palette.mode === "dark" ? "255, 255, 255" : "0, 0, 0"
          }, 0.05)`,
        }}
      >
        <Typography
          fontWeight="700"
          variant="h4"
          sx={{ mb: "0.5rem", color: theme.palette.neutral.dark }}
        >
          Welcome Back
        </Typography>
        <Typography
          fontWeight="400"
          variant="h6"
          sx={{ mb: "2rem", color: theme.palette.neutral.medium }}
        >
          Connect with the world's most interesting people.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
