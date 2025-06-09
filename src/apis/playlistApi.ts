import { IGetCurrentUserPlaylistsRequest, TGetCurrentUserPlaylistsResponse } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: IGetCurrentUserPlaylistsRequest): Promise<TGetCurrentUserPlaylistsResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get current user playlists");
  }
};
