import { Card, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const EmptyPlaylistCard = styled(Card)({
  padding: "20px",
  borderRadius: "8px",
});

const CreatePlaylistButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.text.secondary,
  },
  "&:active": {
    backgroundColor: theme.palette.text.secondary,
  },
  fontWeight: 700,
  padding: "6px 16px",
  borderRadius: "30px",
  marginTop: "20px",
}));

const EmptyPlaylist = () => (
  <EmptyPlaylistCard>
    <Typography variant="h2" fontWeight={700}>
      Create your first playlist
    </Typography>
    <Typography>It's easy, we will help you</Typography>
    <CreatePlaylistButton>Create playlist</CreatePlaylistButton>
  </EmptyPlaylistCard>
);

export default EmptyPlaylist;
