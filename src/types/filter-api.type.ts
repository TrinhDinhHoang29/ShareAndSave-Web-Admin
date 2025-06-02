import { PostStatus, PostType } from "@/types/status.type";

export interface IFilterApi {
  searchBy?: string;
  searchValue?: string | number;
  page?: number;
  limit?: number;
  order?: Order;
  sort?: string;
}
export interface IFilterExtend extends IFilterApi {
  status?: PostStatus;
  type?: PostType;
}
export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
