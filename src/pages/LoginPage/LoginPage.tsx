import { Box, Typography } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";

const LoginPage = () => {
  return (
    <Box display="flex" gap={2} flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h1">Login to Spotify</Typography>
      <LoginButton />
    </Box>
  );
};

export default LoginPage;
