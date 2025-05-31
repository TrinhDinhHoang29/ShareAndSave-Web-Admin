export interface IResponseApi<T> {
  code: number;
  data: T;
  message: string;
}
