import { Box } from "@mui/material";
import LoginButton from "../common/components/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? <UserProfile userProfile={userProfile} /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
