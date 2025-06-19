import SearchCarousel from "./components/SearchCarousel";
import NewReleases from "./components/NewReleases";
import Card from "../../common/components/Card";
import { SearchType } from "../../models/search";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <NewReleases />
      <SearchCarousel
        queryParams={{
          q: "tag:hipster",
          type: [SearchType.ALBUM],
          limit: 10,
        }}
        title="Hipster Albums"
        emptyMessage="No hipster albums"
        getItems={(page) => page.albums?.items ?? []}
        itemToCard={(album) => (
          <Box
            key={album.id}
            sx={{
              flex: {
                xs: "0 0 50%",
                sm: "0 0 33.33%",
                md: "0 0 16.66%",
              },
              minWidth: 0,
            }}
          >
            <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
          </Box>
        )}
      />{" "}
      <SearchCarousel
        queryParams={{
          q: "genre:dance",
          type: [SearchType.TRACK],
          limit: 10,
        }}
        title="Dance Tracks"
        emptyMessage="No dance tracks"
        getItems={(page) => page.tracks?.items ?? []}
        itemToCard={(track) => (
          <Box
            key={track.id}
            sx={{
              flex: {
                xs: "0 0 50%",
                sm: "0 0 33.33%",
                md: "0 0 16.66%",
              },
              minWidth: 0,
            }}
          >
            <Card image={track.album?.images[0]?.url} name={track.name} artistName={track.artists?.[0]?.name} />
          </Box>
        )}
      />
    </div>
  );
};

export default HomePage;
