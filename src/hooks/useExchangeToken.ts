import { QueryClient, useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { IExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  const queryClient = new QueryClient();

  return useMutation<IExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
    },
  });
};

export default useExchangeToken;
