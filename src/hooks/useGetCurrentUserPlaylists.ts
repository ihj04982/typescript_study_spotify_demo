import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { IGetCurrentUserPlaylistsRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({ limit, offset }: IGetCurrentUserPlaylistsRequest) => {
  const accessToken = localStorage.getItem("access_token");
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPages) => {
      if (lastPages.next) {
        const url = new URL(lastPages.next);
        const offset = url.searchParams.get("offset");
        return offset ? parseInt(offset) : undefined;
      }
      return undefined;
    },
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserPlaylists;
