import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { IExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  return useMutation<IExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchangeToken;
