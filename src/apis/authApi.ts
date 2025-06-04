import axios from "axios";
import { clientSecret } from "../configs/authConfig";
import { clientId } from "../configs/authConfig";
import { threadId } from "worker_threads";
import { IClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
  return Buffer.from(data).toString("base64");
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
