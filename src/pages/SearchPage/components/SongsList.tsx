import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AddCircleOutline, MoreHoriz } from "@mui/icons-material";
import { Menu, MenuProps, styled } from "@mui/material";
import { formatDuration } from "../../../utils/format";
import { useState } from "react";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useAddItemsToPlaylist from "../../../hooks/useAddItemsToPlaylist";
import { ISimplifiedPlaylist } from "../../../models/playlist";
import { ITrack } from "../../../models/track";
import PlaylistMenu from "./PlaylistMenu";

const SongsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const SongsListItem = styled(ListItem)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "40px minmax(0,1fr) 40px 40px 40px",
  alignItems: "center",
  gap: "1rem",
  maxWidth: "100%",
  padding: " 8px",
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

const SongsListItemInfoContainer = styled("div")({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const SongsListItemText = styled(Typography)(({ theme }) => ({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
}));

const SongsListItemTitle = styled(SongsListItemText)(({ theme }) => ({
  fontWeight: 500,
}));

function SongsList({ tracks }: { tracks: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const { data: playlists } = useGetCurrentUserPlaylists({
    limit: 5,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();
  const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>, track: ITrack) => {
    setIsMenuOpen(true);
    setAnchorEl(event.currentTarget);
    setSelectedTrack(track);
  };

  const handleAddItemsToPlaylist = (playlist: ISimplifiedPlaylist) => {
    if (playlist.id && selectedTrack) {
      addItemsToPlaylist({
        playlist_id: playlist.id,
        params: {
          uris: [selectedTrack.uri || ""],
          position: 0,
        },
      });
    }
    setIsMenuOpen(false);
    setSelectedTrack(null);
  };

  return (
    <SongsContainer>
      {tracks.length ? (
        tracks.map((track) => (
          <SongsListItem key={track.id}>
            <SongsListItemImage src={track.album?.images?.[0]?.url} alt={track.album?.name} />
            <SongsListItemInfoContainer>
              <SongsListItemTitle title={track.name}>{track.name}</SongsListItemTitle>
              <SongsListItemText
                variant="body2"
                color="text.secondary"
                title={track.album?.artists?.[0]?.name}
                sx={{ fontWeight: 400 }}
              >
                {track.album?.artists?.[0]?.name}
              </SongsListItemText>
            </SongsListItemInfoContainer>
            <IconButton sx={{ color: "text.secondary" }} size="small" onClick={(event) => handleAddClick(event, track)}>
              <AddCircleOutline />
            </IconButton>
            <PlaylistMenu
              open={isMenuOpen}
              anchorEl={anchorEl}
              onClose={() => {
                setIsMenuOpen(false);
                setSelectedTrack(null);
              }}
              user={user}
              playlists={playlists}
              handleAddItemsToPlaylist={handleAddItemsToPlaylist}
            />
            <ListItemText secondary={formatDuration(track.duration_ms || 0)} />
            <IconButton sx={{ color: "text.secondary" }} size="small">
              <MoreHoriz />
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
