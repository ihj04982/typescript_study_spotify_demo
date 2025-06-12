import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreatePlaylistRequest } from "../models/playlist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { createPlaylist } from "../apis/playlistApi";
import { useNavigate } from "react-router";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: ICreatePlaylistRequest) => {
      if (user) {
        return createPlaylist(user.id, params);
      } else {
        navigate("/login");
      }
      return Promise.reject(new Error("User not found"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
