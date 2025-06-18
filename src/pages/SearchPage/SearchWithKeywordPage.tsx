import { useParams } from "react-router";
import { SearchType } from "../../models/search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TopResult from "./TopResult";
import SongsList from "./SongsList";
import { Stack } from "@mui/material";
import ArtistList from "./ArtistList";
import AlbumList from "./AlbumList";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: keyword || "",
    type: Object.values(SearchType),
    limit: 5,
  });

  if (error) return <ErrorMessage errorMessage={error.message} />;

  if (isLoading) return <LoadingSpinner />;

  const noResult =
    data?.pages[0].albums?.total === 0 &&
    data?.pages[0].artists?.total === 0 &&
    data?.pages[0].tracks?.total === 0 &&
    data?.pages[0].playlists?.total === 0 &&
    data?.pages[0].shows?.total === 0 &&
    data?.pages[0].episodes?.total === 0 &&
    data?.pages[0].audiobooks?.total === 0;

  if (noResult) {
    return (
      <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
        No results found for "{keyword}"
        <br />
        Please make sure your words are spelled correctly, or use fewer or different keywords.
      </Typography>
    );
  }

  const page = data?.pages[0];

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h1" sx={{ marginBottom: "0.5rem" }}>
            Top Result
          </Typography>
          <TopResult track={page?.tracks?.items?.[0]} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h1" sx={{ marginBottom: "0.5rem" }}>
            Songs
          </Typography>
          <SongsList tracks={page?.tracks?.items || []} />
        </Grid>
      </Grid>
      <div>
        {page?.artists?.items && page?.artists?.items?.length > 0 && (
          <div>
            <Typography variant="h1" sx={{ marginBottom: "0.5rem" }}>
              Artists
            </Typography>
            <ArtistList artists={page?.artists?.items || []} />
          </div>
        )}
      </div>
      <div>
        {page?.albums?.items && page?.albums?.items?.length > 0 && (
          <div>
            <Typography variant="h1" sx={{ marginBottom: "0.5rem" }}>
              Albums
            </Typography>
            <AlbumList albums={page?.albums?.items || []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWithKeywordPage;
