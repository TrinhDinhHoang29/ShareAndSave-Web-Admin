import { http } from "@/lib/http";
import { IFilterApi } from "@/types/filter-api.type";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getItemWarehouses = async (
  params: IFilterApi
): Promise<
  IResponseApi<{ itemWarehouses: IItemWarehouse[]; totalPage: number }>
> => {
  const response = await api.get(`/item-warehouses`, {
    params: params,
  });
  return response.data;
};
const getItemWarehouse = async (
  code: string
): Promise<IResponseApi<{ itemWarehouse: IItemWarehouse }>> => {
  const response = await api.get(`/item-warehouses/${code}`);
  return response.data;
};
export { getItemWarehouse, getItemWarehouses };
