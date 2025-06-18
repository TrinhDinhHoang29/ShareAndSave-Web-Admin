import {
  InterestType,
  PostStatus,
  PostType,
  TransactionStatus,
} from "@/types/status.type";

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
export interface IFilterInterest {
  search?: string;
  page?: number;
  limit?: number;
  order?: Order;
  type?: InterestType;
}
export interface IFilterTransaction extends IFilterApi {
  status?: TransactionStatus;
  postID?: number;
}
export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
