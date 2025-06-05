import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import { IClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    return btoa(data);
  } else {
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken = async (): Promise<IClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({ grant_type: "client_credentials" });
    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedBase64(`${clientId}:${clientSecret}`)}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get client credential token");
  }
};
