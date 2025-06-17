import { useInfiniteQuery } from "@tanstack/react-query";
import { getBrowseCategories } from "../apis/categoryApi";
import { IBrowseCategoryRequest } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetBrowseCategories = (params: IBrowseCategoryRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["browse-categories", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getBrowseCategories(clientCredentialToken, { ...params, offset: pageParam });
    },
    getNextPageParam: (lastPage) => {
      const { categories } = lastPage;
      if (categories.next) {
        const url = new URL(categories.next);
        const offset = url.searchParams.get("offset");
        return offset ? Number(offset) : undefined;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!clientCredentialToken,
  });
};

export default useGetBrowseCategories;
