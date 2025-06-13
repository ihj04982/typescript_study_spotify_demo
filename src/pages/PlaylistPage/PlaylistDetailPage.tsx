import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { styled, Typography } from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistDetailTable from "./components/PlaylistDetailTable";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import LoadMoreSection from "../../common/components/LoadMoreSection";

const PlaylistPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    gap: "16px",
  },
}));

const PlaylistItemContainer = styled("div")({
  flex: "1 1 0%",
  minHeight: 0,
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const PlaylistHeader = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  flexShrink: 0,
  [theme.breakpoints.down("md")]: {
    gap: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

const PlaylistImageContainer = styled("div")(({ theme }) => ({
  width: "190px",
  height: "190px",
  flexShrink: 0,
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "160px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "120px",
    height: "120px",
    alignSelf: "center",
  },
}));

const PlaylistImage = styled("img")({
  width: "100%",
  height: "100%",
  borderRadius: "4px",
  objectFit: "cover",
});

const PlaylistDetailInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  justifyContent: "end",
  minWidth: 0,
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

const PlaylistTitle = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: "bold",
  lineHeight: 1.1,
  wordBreak: "break-word",
  [theme.breakpoints.down("lg")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

const PlaylistOwnerInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const SpotifyLogo = styled("img")({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  objectFit: "cover",
});

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id || "" });

  const { ref, inView } = useInView();

  const {
    data: playlistItems,
    isLoading: isLoadingItems,
    error: itemsError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id || "", limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (id === undefined) return <Navigate to="/" />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  if (itemsError) return <ErrorMessage errorMessage={itemsError.message} />;
  if (isLoadingItems) return <LoadingSpinner />;

  return (
    <PlaylistPageContainer>
      <PlaylistHeader>
        <PlaylistImageContainer>
          {playlist?.images?.[0]?.url ? (
            <PlaylistImage src={playlist?.images?.[0]?.url} alt={playlist?.name} />
          ) : (
            <DefaultImage iconSize={64} />
          )}
        </PlaylistImageContainer>
        <PlaylistDetailInfo>
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {playlist?.type}
          </Typography>
          <PlaylistTitle>{playlist?.name}</PlaylistTitle>
          <PlaylistOwnerInfo>
            <SpotifyLogo
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              alt="spotify-logo-image"
            />
            <Typography fontWeight={500} sx={{ wordBreak: "break-word" }}>
              {playlist?.owner?.display_name} • {playlist?.tracks?.total} songs
            </Typography>
          </PlaylistOwnerInfo>
        </PlaylistDetailInfo>
      </PlaylistHeader>
      <PlaylistItemContainer>
        {playlist?.tracks?.total === 0 ? (
          <EmptyPlaylistWithSearch />
        ) : (
          <div>
            <PlaylistDetailTable playlistItems={playlistItems} />
            <LoadMoreSection ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</LoadMoreSection>
          </div>
        )}
      </PlaylistItemContainer>
    </PlaylistPageContainer>
  );
};

export default PlaylistDetailPage;
