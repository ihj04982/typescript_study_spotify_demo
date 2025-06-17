import { IExternalUrls, IFollowers, IImage } from "./commonType";

export interface IArtist {
  external_urls?: IExternalUrls;
  followers?: IFollowers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: IImage[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
}
