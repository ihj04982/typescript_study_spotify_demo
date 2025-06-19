import { Grid, styled, Typography } from "@mui/material";
import { ISimplifiedAlbum } from "../../models/album";

const AlbumListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  padding: 0,
  margin: 0,
  listStyle: "none",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

const AlbumListItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    "& .play-button": {
      opacity: 1,
    },
  },
  position: "relative",
  borderRadius: "4px",
}));

const AlbumListItemImage = styled("img")({
  width: "180px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "4px",
  marginBottom: "1rem",
});

const AlbumListItemName = styled(Typography)({
  wordBreak: "break-word",
  whiteSpace: "normal",
  maxWidth: "200px",
});

function AlbumList({ albums }: { albums: ISimplifiedAlbum[] }) {
  return (
    <Grid container spacing={2}>
      <AlbumListContainer>
        {albums.map((album, idx) => (
          <AlbumListItem key={album?.id || idx}>
            <AlbumListItemImage src={album?.images?.[0]?.url} alt={album?.name} />
            <AlbumListItemName fontSize={"16px"}>{album?.name}</AlbumListItemName>
            <Typography fontSize={"14px"} color="text.secondary">
              {album?.release_date?.slice(0, 4)}
              {album?.artists?.[0]?.name ? ` · ${album.artists[0].name}` : ""}
            </Typography>
          </AlbumListItem>
        ))}
      </AlbumListContainer>
    </Grid>
  );
}

export default AlbumList;
