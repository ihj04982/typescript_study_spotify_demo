import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "../../layout/EmptyPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "../../layout/Playlist";

const LibraryPage = () => {
  const { ref, inView } = useInView();
  const { data: user } = useGetCurrentUserProfile();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

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
      <h1>My Playlists</h1>
      {data?.pages.map((page, index) => (
        <Playlist key={index} playlists={page.items} />
      ))}
      <div ref={ref} style={{ height: "50px" }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default LibraryPage;
