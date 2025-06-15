import { IApiResponse } from "./apiResponse";
import { IExternalUrls, IFollowers, IImage, IOwner } from "./commonType";
import { IEpisode, ITrack } from "./track";

export interface IGetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}

// 객체 형태가 아니므로 타입으로 정의
export type TGetCurrentUserPlaylistsResponse = IApiResponse<ISimplifiedPlaylist>;

export interface IBasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: IExternalUrls;
  href?: string;
  id?: string;
  images?: IImage[];
  name?: string;
  owner?: IOwner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}
export interface ISimplifiedPlaylist extends IBasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface IPlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: IExternalUrls;
    followers?: IFollowers;
    href?: string;
    id?: string;
    type?: "user";
    uri?: string;
  } | null;
  is_local?: boolean;
  track: ITrack | IEpisode;
}

export interface IPlaylist extends IBasePlaylist {
  tracks?: IApiResponse<IPlaylistTrack[]>;
  followers?: IFollowers;
}

export interface IGetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface IGetPlaylistItemsRequest extends IGetPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type TGetPlaylistItemsResponse = IApiResponse<IPlaylistTrack>;

export interface ICreatePlaylistRequest {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface IAddItemsToPlaylistRequest {
  position?: number;
  uris?: string[];
}

export interface IAddItemsToPlaylistResponse {
  snapshot_id: string;
}
