export interface IApiResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}
