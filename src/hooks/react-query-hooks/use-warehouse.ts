import { getWarehouse, getWarehouses } from "@/apis/warehouse.api";
import { IFilterApi } from "@/types/filter-api.type";
import { useQuery } from "@tanstack/react-query";

export const warehouseKeys = {
  all: ["warehouses"] as const,
  list: (params: IFilterApi) =>
    [
      "warehouses",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: number) => ["warehouses", "detail", id] as const,
};

export const useWarehouses = (params: IFilterApi) => {
  return useQuery({
    queryKey: warehouseKeys.list(params),
    queryFn: async () => {
      const res = await getWarehouses(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useWarehouse = (id: number) => {
  return useQuery({
    queryKey: warehouseKeys.detail(id),
    queryFn: async () => {
      const res = await getWarehouse(id);
      return res.warehouse;
    },
    enabled: id !== 0,
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
