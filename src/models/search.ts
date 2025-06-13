import { ISimplifiedAlbum } from "./album";
import { IApiResponse } from "./apiResponse";
import { IArtist } from "./artist";
import { ISimplifiedPlaylist } from "./playlist";
import { IShow, ISimplifiedAudiobook, ISimplifiedEpisode, ITrack } from "./track";

export enum SearchType {
  TRACK = "track",
  ALBUM = "album",
  PLAYLIST = "playlist",
  SHOW = "show",
  EPISODE = "episode",
  AUDIOBOOK = "audiobook",
  ARTIST = "artist",
}

export interface ISearchRequestParams {
  q: string;
  type: SearchType[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface ISearchResponse {
  albums?: IApiResponse<ISimplifiedAlbum>;
  artists?: IApiResponse<IArtist>;
  tracks?: IApiResponse<ITrack>;
  playlists?: IApiResponse<ISimplifiedPlaylist>;
  shows?: IApiResponse<IShow>;
  episodes?: IApiResponse<ISimplifiedEpisode>;
  audiobooks?: IApiResponse<ISimplifiedAudiobook>;
}
