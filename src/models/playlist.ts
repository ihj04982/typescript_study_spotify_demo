import { ISimplifiedAlbum } from "./album";
import { IApiResponse } from "./apiResponse";
import { IArtist } from "./artist";
import { ICopyright, IExternalIds, IExternalUrls, IFollowers, IImage, IOwner, IRestriction } from "./commonType";

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

export interface ITrack {
  album?: ISimplifiedAlbum;
  artists?: IArtist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: IExternalIds;
  external_urls?: IExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: IArtist;
  restrictions?: IRestriction;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface IEpisode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  uri: string;
  restrictions?: IRestriction;
  show?: {
    available_markets?: string[];
    copyrights: ICopyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: IExternalUrls;
    href: string;
    id: string;
    images: IImage[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
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
  };
  is_local?: boolean;
  track?: ITrack | IEpisode;
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
