import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AddCircleOutline, MoreHoriz } from "@mui/icons-material";
import { styled } from "@mui/material";
import { formatDuration } from "../../utils/format";

const SongsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const SongsListItem = styled(ListItem)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "40px minmax(0,1fr) 40px 40px 40px",
  alignItems: "center",
  gap: "1rem",
  maxWidth: "100%",
  padding: "0 4px 0 8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:active": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const SongsListItemImage = styled("img")({
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: "4px",
  marginRight: "1rem",
});

const SongsListItemTitle = styled(ListItemText)({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

function SongsList({ tracks }: { tracks: any[] }) {
  return (
    <SongsContainer>
      {tracks.length ? (
        tracks.map((track, idx) => (
          <SongsListItem key={track.id || idx}>
            <SongsListItemImage src={track.album?.images?.[0]?.url} alt={track.album?.name} />
            <SongsListItemTitle primary={track.name} secondary={track.album?.artists?.[0]?.name} />
            <IconButton sx={{ color: "text.secondary" }} size="small">
              <MoreHoriz />
            </IconButton>
            <ListItemText secondary={formatDuration(track.duration_ms || 0)} />
            <IconButton sx={{ color: "text.secondary" }} size="small">
              <AddCircleOutline />
            </IconButton>
          </SongsListItem>
        ))
      ) : (
        <Typography>No songs found</Typography>
      )}
    </SongsContainer>
  );
}

export default SongsList;
