import { IApiResponse } from "./apiResponse";
import { IExternalUrls, IImage, IOwner } from "./commonType";

export interface IGetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}

// 객체 형태가 아니므로 타입으로 정의
export type TGetCurrentUserPlaylistsResponse = IApiResponse<ISimplifiedPlaylist>;

export interface ISimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls: IExternalUrls;
  href?: string;
  id?: string;
  images?: IImage[];
  name?: string;
  owner?: IOwner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}
