import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { IGetNewReleasesResponse } from "../models/album";
import axios from "axios";

export const getNewReleases = async (clientCredentialToken: string): Promise<IGetNewReleasesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get new releases");
  }
};
