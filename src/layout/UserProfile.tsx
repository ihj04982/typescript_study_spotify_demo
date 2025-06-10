import { Card, styled, Tooltip } from "@mui/material";
import { IUser } from "../models/user";
import { DEFAULT_PROFILE_IMAGE } from "../configs/commonConfig";

const ProfileImageContainer = styled(Card)({
  width: "48px",
  height: "48px",
  padding: "8px",
  borderRadius: "50%",
  "&:hover": {
    cursor: "pointer",
    scale: "1.05",
    transition: "all 0.1s ease",
  },
});

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const UserProfile = ({ userProfile }: { userProfile: IUser }) => {
  return (
    <Tooltip title={userProfile.display_name} placement="bottom">
      <ProfileImageContainer>
        <ProfileImage alt={userProfile.display_name} src={userProfile.images?.[0]?.url || DEFAULT_PROFILE_IMAGE} />
      </ProfileImageContainer>
    </Tooltip>
  );
};

export default UserProfile;
