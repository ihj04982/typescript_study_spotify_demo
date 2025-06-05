import { IArtist } from "./artist";
import { IExternalUrls, IImage, IRestriction } from "./commonType";

export interface IGetNewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: ISimplifiedAlbum[];
  };
}

export interface ISimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: IRestriction;
  type: string;
  uri: string;
  artists: IArtist[];
}
