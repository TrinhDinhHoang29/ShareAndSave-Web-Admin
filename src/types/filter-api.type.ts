export interface IFilterApi {
  searchBy?: string;
  searchValue?: string;
  page?: number;
  limit?: number;
  order?: Order;
  sort?: string;
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
