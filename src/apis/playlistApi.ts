import {
  IGetCurrentUserPlaylistsRequest,
  IGetPlaylistItemsRequest,
  IGetPlaylistRequest,
  IPlaylist,
  TGetCurrentUserPlaylistsResponse,
  TGetPlaylistItemsResponse,
} from "../models/playlist";
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

export const getPlaylist = async (params: IGetPlaylistRequest): Promise<IPlaylist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params: {
        market: params.market,
        fields: params.fields,
        additional_types: params.additional_types,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get playlist");
  }
};

export const getPlaylistItems = async (params: IGetPlaylistItemsRequest): Promise<TGetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get playlist items");
  }
};
