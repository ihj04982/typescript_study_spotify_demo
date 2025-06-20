import { Grid, styled, Typography } from "@mui/material";
import { IArtist } from "../../../models/artist";
import PlayButton from "../../../common/components/PlayButton";

const ArtistListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  padding: 0,
  margin: 0,
  listStyle: "none",
  overflow: "auto ",
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
}));

const ArtistListItem = styled("div")(({ theme }) => ({
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

const ArtistListItemImage = styled("img")({
  width: "180px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "50%",
  marginBottom: "1rem",
});

const PlayButtonContainer = styled("div")({
  position: "absolute",
  bottom: "3rem",
  right: "1rem",
  opacity: 0,
  transition: "opacity 0.2s ease",
  "&:hover": {
    opacity: 1,
  },
});

function ArtistList({ artists }: { artists: IArtist[] }) {
  return (
    <Grid container spacing={2}>
      <ArtistListContainer>
        {artists.map((artist, idx) => (
          <ArtistListItem key={artist?.id || idx}>
            <ArtistListItemImage src={artist?.images?.[0]?.url} alt={artist?.name} />
            <Typography fontSize={"16px"}>{artist?.name}</Typography>
            <Typography fontSize={"14px"} color="text.secondary">
              {artist?.type}
            </Typography>
            <PlayButtonContainer className="play-button">
              <PlayButton />
            </PlayButtonContainer>
          </ArtistListItem>
        ))}
      </ArtistListContainer>
    </Grid>
  );
}

export default ArtistList;
