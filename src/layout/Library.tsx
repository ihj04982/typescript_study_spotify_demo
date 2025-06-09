import { styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import LoadingSpinner from "../common/components/LoadingSpinner";
import ErrorMessage from "../common/components/ErrorMessage";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PlayListContainer = styled("div")(({ theme }) => ({
  height: "100%",
  maxHeight: "calc(100vh - 240px)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!user) {
    return <EmptyPlaylist />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlayListContainer>
          {data.pages.map((page, index) => (
            <Playlist key={index} playlists={page.items} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </PlayListContainer>
      )}
    </div>
  );
};

export default Library;
