import {
  getWarehouse,
  getWarehouses,
  updateWarehouse,
} from "@/apis/warehouse.api";
import { UpdateWarehouseDto } from "@/schemas/warehouses/update-warehouse";
import { IFilterApi } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      return res.data!;
    },
    enabled: id !== 0,
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useUpdateWarehouse = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateWarehouseDto;
    }) => {
      const res = await updateWarehouse(id, data);
      return res.data!;
    },
    onSuccess: (_, { id }) => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({
        queryKey: warehouseKeys.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
