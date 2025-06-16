import { IApiResponse } from "./apiResponse";
import { IImage } from "./commonType";

export interface ICategory {
  href: string;
  icons: IImage[];
  id: string;
  name: string;
}

export interface IBrowseCategoryRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface IBrowseCategoryResponse {
  categories: IApiResponse<ICategory>;
}
