import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGoodDeed, deleteGoodDeed } from "@/apis/good-deed.api";
import { CreateGoodDeedDto } from "@/schemas/good-deeds/create-good-deed.schema";
import { userKeys } from "@/hooks/react-query-hooks/use-users";

export const goodDeedKeys = {
  all: ["good-deeds"] as const,
  list: () => ["good-deeds"] as const,
  detail: (id: number) => ["good-deeds", "detail", id] as const,
};

export const useCreateGoodDeed = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGoodDeedDto) => {
      const res = await createGoodDeed(data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: goodDeedKeys.all }); // hoặc list
      queryClient.invalidateQueries({ queryKey: userKeys.all }); // hoặc list

      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

export const useDeleteGoodDeed = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteGoodDeed(id);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodDeedKeys.all }); // hoặc list
      queryClient.invalidateQueries({ queryKey: userKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
