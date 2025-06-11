import { useInfiniteQuery } from "@tanstack/react-query";
import { IGetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: IGetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params],
    queryFn: ({ pageParam = 0 }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get("offset");
      return offset ? parseInt(offset) : undefined;
    },
  });
};

export default useGetPlaylistItems;
