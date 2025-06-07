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
