import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { IUser } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<IUser, Error> => {
  const access_token = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!access_token,
    staleTime: 0,
  });
};

export default useGetCurrentUserProfile;
