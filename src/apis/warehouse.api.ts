import { http } from "@/lib/http";
import { UpdateWarehouseDto } from "@/schemas/warehouses/update-warehouse";
import { IFilterApi } from "@/types/filter-api.type";
import { IWarehouse } from "@/types/models/warehouse.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

export const getWarehouses = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page = 1,
  limit = 10,
}: IFilterApi): Promise<
  IResponseApi<{ warehouses: IWarehouse[]; totalPage: number }>
> => {
  const response = await api.get(`/warehouses?page=${page}&limit=${limit}`, {
    params: {
      searchBy,
      searchValue,
      sort,
      order,
    },
  });
  return response.data;
};

export const getWarehouse = async (
  id: number
): Promise<IResponseApi<{ warehouse: IWarehouse }>> => {
  const response = await api.get(`/warehouses/${id}`);
  return response.data;
};

export const updateWarehouse = async (
  id: number,
  data: UpdateWarehouseDto
): Promise<IResponseApi<{ warehouse: IWarehouse }>> => {
  const response = await api.patch(`/warehouses/${id}`, data);
  return response.data;
};
