import { Card, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import { PlayArrow } from "@mui/icons-material";

const PlaylistItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  gap: "10px",
  padding: "8px",
  width: "100%",
  borderRadius: "6px",
  backgroundColor: selected ? theme.palette.action.hover : "transparent",
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

const PlaylistImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "4px",
}));

const EmptyImage = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const PlayButton = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  transition: `opacity 0.2s ease-in-out`,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
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
}

const PlaylistItem = ({ image, name, type, ownerName, id, handleClick }: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer>
      <ImageWrapper>
        {image ? (
          <PlaylistImage className="playlist-image" src={image} alt={name} />
        ) : (
          <EmptyImage className="playlist-image">
            <MusicNote />
          </EmptyImage>
        )}
        <PlayButton className="play-button">
          <PlayArrow />
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
