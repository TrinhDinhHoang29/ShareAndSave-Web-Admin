import { getItemWarehouses } from "@/apis/item-warehouse.api";
import { IFilterApi } from "@/types/filter-api.type";
import { useQuery } from "@tanstack/react-query";

export const itemWarehouseKeys = {
  all: ["item-warehouses"] as const,
  list: (params: IFilterApi) =>
    [
      "item-warehouses",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: number) => ["item-warehouses", "detail", id] as const,
};

export const useItemWarehouses = (params: IFilterApi) => {
  return useQuery({
    queryKey: itemWarehouseKeys.list(params),
    queryFn: async () => {
      const res = await getItemWarehouses(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
