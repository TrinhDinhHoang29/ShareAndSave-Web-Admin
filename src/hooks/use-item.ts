import { createItems, getItems } from "@/apis/item.api";
import { CreateItemDto } from "@/schemas/items/create-item.schema";
import { IFilterApi } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const itemKeys = {
  all: ["items"] as const,
  list: (params: IFilterApi) =>
    [
      "items",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: string) => ["items", "detail", id] as const,
};

export const useItems = (params: IFilterApi) => {
  return useQuery({
    queryKey: itemKeys.list(params),
    queryFn: async () => {
      const res = await getItems(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useCreateItem = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateItemDto) => {
      const res = await createItems(data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa

      queryClient.invalidateQueries({ queryKey: itemKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
