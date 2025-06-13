import { Button, styled } from "@mui/material";
import { IUser } from "../models/user";
import { DEFAULT_PROFILE_IMAGE } from "../configs/commonConfig";
import { useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";

// Circular profile button for user avatar
const ProfileButton = styled(Button)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  padding: 8,
  borderRadius: "50%",
  backgroundColor: "#282828",
  overflow: "hidden",
  "&:active": {
    backgroundColor: "#282828",
  },
}));

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const UserProfile = ({ userProfile }: { userProfile: IUser }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    window.location.reload();
  };
  return (
    <div>
      <ProfileButton ref={anchorRef} onClick={handleClick}>
        <ProfileImage alt={userProfile.display_name} src={userProfile.images?.[0]?.url || DEFAULT_PROFILE_IMAGE} />
      </ProfileButton>
      <ProfileMenu anchorEl={anchorRef.current} open={open} onClose={handleClose} logout={logout} />
    </div>
  );
};

export default UserProfile;
