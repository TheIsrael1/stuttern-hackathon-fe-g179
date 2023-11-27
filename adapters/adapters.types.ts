export interface RequestParamsWithToken<T> {
  token: string;
  params?: T;
}
