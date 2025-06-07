import { IExplicitContent, IExternalUrls, IFollowers, IImage } from "./commonType";

export interface IUser {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: IExplicitContent;
  external_urls?: IExternalUrls;
  followers?: IFollowers;
  href?: string;
  id?: string;
  images?: IImage[];
  product?: string;
  type?: string;
  uri?: string;
}
