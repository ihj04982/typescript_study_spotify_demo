import { useInfiniteQuery } from "@tanstack/react-query";
import { getBrowseCategories } from "../apis/categoryApi";
import { IBrowseCategoryRequest } from "../models/category";

const useGetBrowseCategories = (params: IBrowseCategoryRequest) => {
  return useInfiniteQuery({
    queryKey: ["browse-categories", params],
    queryFn: ({ pageParam = 0 }) => getBrowseCategories({ ...params, offset: pageParam }),
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
  });
};

export default useGetBrowseCategories;
