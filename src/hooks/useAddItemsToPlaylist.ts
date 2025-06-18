import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/playlistApi";
import { IAddItemsToPlaylistRequest } from "../models/playlist";

const useAddItemsToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlist_id, params }: { playlist_id: string; params: IAddItemsToPlaylistRequest }) => {
      return addItemsToPlaylist(playlist_id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist-detail"] });
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
    },
  });
};

export default useAddItemsToPlaylist;
