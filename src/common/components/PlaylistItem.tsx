import { Button, Card, ListItemButton, ListItemText, styled, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import { PlayArrow } from "@mui/icons-material";
import DefaultImage from "./DefaultImage";

const PlaylistItemContainer = styled(ListItemButton)(({ theme }) => ({
  gap: "10px",
  padding: "8px",
  width: "100%",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    "& .playlist-image": {
      opacity: 0.5,
    },
    "& .play-button": {
      opacity: 1,
    },
  },
}));

const ImageWrapper = styled("div")({
  position: "relative",
  width: "48px",
  height: "48px",
  borderRadius: "4px",
  transition: `opacity 0.2s ease-in-out`,
});

const PlaylistImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "4px",
});

const PlayButton = styled(Button)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  transition: `opacity 0.2s ease-in-out`,
  color: "white",
  background: "none !important",
});

const TruncatedText = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});

interface PlaylistItemProps {
  image: string | null;
  name: string;
  ownerName: string | null;
  id: string;
  type: string;
  handleClick: (id: string) => void;
  selected: boolean;
}

const PlaylistItem = ({ image, name, type, ownerName, id, handleClick, selected }: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer onClick={() => handleClick(id)} selected={selected}>
      <ImageWrapper>
        {image ? (
          <PlaylistImage className="playlist-image" src={image} alt={name} />
        ) : (
          <div className="playlist-image" style={{ width: "100%", height: "100%" }}>
            <DefaultImage iconSize={20} />
          </div>
        )}
        <PlayButton className="play-button" disableRipple>
          <PlayArrow fontSize="large" />
        </PlayButton>
      </ImageWrapper>
      <ListItemText
        primary={
          <TruncatedText variant="h2" fontWeight={400} color="text.primary">
            {name}
          </TruncatedText>
        }
        secondary={
          <Typography variant="body1" color="text.secondary">
            {type} • {ownerName}
          </Typography>
        }
      />
    </PlaylistItemContainer>
  );
};

export default PlaylistItem;
