import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreatePlaylistRequest } from "../models/playlist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { createPlaylist } from "../apis/playlistApi";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();

  return useMutation({
    mutationFn: (params: ICreatePlaylistRequest) => {
      if (user) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("User not found"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
