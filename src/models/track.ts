import { ISimplifiedAlbum } from "./album";
import { IArtist } from "./artist";
import { ICopyright, IExternalIds, IExternalUrls, IImage, IRestriction } from "./commonType";

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
  linked_from?: ITrack;
  restrictions?: IRestriction;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface IEpisode {
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
  show?: IShow;
}

export type ISimplifiedEpisode = Omit<IEpisode, "show">;

export interface IShow {
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
}

export interface ISimplifiedAudiobook {
  author: {
    name: string;
  }[];
  available_markets: string[];
  copyrights: ICopyright[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}
