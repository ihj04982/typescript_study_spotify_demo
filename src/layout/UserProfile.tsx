import { Card, styled, Tooltip } from "@mui/material";
import { IUser } from "../models/user";

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

const DEFAULT_PROFILE_IMAGE =
  "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='white'/%3E%3C/svg%3E";

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
