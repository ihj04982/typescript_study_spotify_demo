import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { IconButton, styled } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

const TopResultContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "hidden",
  wordBreak: "break-word",
  padding: "1rem",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  position: "relative",
  "&:hover": {
    ".play-button": {
      opacity: 1,
    },
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "black",
  position: "absolute",
  bottom: "16px",
  right: "16px",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  opacity: 0,
  transition: "opacity 0.2s ease, transform 0.2s ease",
  "&:active": {
    transform: "scale(1.1)",
  },
}));

const TopResultImage = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "4px",
});

function TopResult({ track }: { track: any }) {
  if (!track) return <Typography>No top result</Typography>;
  return (
    <TopResultContainer>
      <TopResultImage src={track.album?.images?.[0]?.url} alt={track.album?.name} />
      <Typography variant="h1" style={{ marginTop: "12px" }}>
        {track.name}
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
        <Typography color="text.secondary">Song</Typography>
        <Typography variant="body1">{track.album?.artists?.[0]?.name}</Typography>
      </div>
      <PlayButton disableRipple className="play-button">
        <PlayArrow sx={{ fontSize: "2rem" }} />
      </PlayButton>
    </TopResultContainer>
  );
}

export default TopResult;
