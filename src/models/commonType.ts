export interface IExternalUrls {
  spotify: string;
}

export interface IImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface IRestriction {
  reason?: string;
}

export interface IFollowers {
  href?: string;
  total?: number;
}

export interface IExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface IOwner {
  external_urls?: IExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}
