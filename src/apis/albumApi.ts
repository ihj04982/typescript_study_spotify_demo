import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { IGetNewReleasesResponse } from "../models/album";
import api from "../utils/api";

export const getNewReleases = async (clientCredentialToken: string): Promise<IGetNewReleasesResponse> => {
  try {
    const response = await api.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get new releases");
  }
};
