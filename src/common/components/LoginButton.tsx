import { Button } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/auth";

const LoginButton = () => {
  const login = () => {
    // 스포티파이에서 제공하는 auth에 로그인 요청
    getSpotifyAuthUrl();
  };

  return (
    <Button variant="contained" color="secondary" size="large" onClick={login} className="login-button">
      Login
    </Button>
  );
};

export default LoginButton;
