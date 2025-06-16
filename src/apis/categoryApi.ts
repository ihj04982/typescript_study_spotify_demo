import axios from "axios";
import { IBrowseCategoryRequest, IBrowseCategoryResponse } from "../models/category";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getBrowseCategories = async (params: IBrowseCategoryRequest): Promise<IBrowseCategoryResponse> => {
  const { locale, limit, offset } = params;
  const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    params: {
      locale,
      limit,
      offset,
    },
  });
  return response.data;
};
