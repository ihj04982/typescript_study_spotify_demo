import { Menu, MenuItem, ListItemText, Divider, Typography, styled } from "@mui/material";
import { ISimplifiedPlaylist, TGetCurrentUserPlaylistsResponse } from "../../models/playlist";
import { IUser } from "../../models/user";

interface PlaylistMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  user: IUser | undefined;
  playlists: { pages: TGetCurrentUserPlaylistsResponse[] } | undefined;
  handleAddItemsToPlaylist: (playlist: ISimplifiedPlaylist) => void;
}
const PlaylistMenuStyled = styled(Menu)({
  width: "200px",
  height: "250px",
  "& .MuiPaper-root": {
    scrollbarWidth: "none",
  },
  minWidth: "0",
});

const PlaylistMenu = ({ open, anchorEl, onClose, user, playlists, handleAddItemsToPlaylist }: PlaylistMenuProps) => (
  <PlaylistMenuStyled open={open} anchorEl={anchorEl} onClose={onClose}>
    {!!user ? (
      <>
        <Typography variant="body1" sx={{ padding: "8px 16px" }}>
          Add to playlist
        </Typography>
        <Divider />
        {playlists?.pages
          .flatMap((page) => page.items)
          .map((playlist) => (
            <MenuItem key={playlist.id} onClick={() => handleAddItemsToPlaylist(playlist)}>
              <Typography
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  minWidth: 0,
                }}
              >
                {playlist.name}
              </Typography>
            </MenuItem>
          ))}
      </>
    ) : (
      <MenuItem disabled>
        <Typography>Login to add to playlist</Typography>
      </MenuItem>
    )}
  </PlaylistMenuStyled>
);

export default PlaylistMenu;
