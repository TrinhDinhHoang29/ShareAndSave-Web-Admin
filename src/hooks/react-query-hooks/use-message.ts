import { getMessages, updateReadMessage } from "@/apis/chat.api";
import { IFilterChat } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const messageKeys = {
  all: ["messages"] as const,
  list: (params: IFilterChat) =>
    [
      "messages",
      params.search ?? "",
      params.interestID ?? "",
      params.search ?? "",
      params.limit ?? 20,
    ] as const,
  detail: (id: string) => ["messages", "detail", id] as const,
};

export const useMessages = (params: IFilterChat) => {
  return useQuery({
    queryKey: messageKeys.list(params),
    queryFn: async () => {
      const res = await getMessages(params);
      return res.data!;
    },
    staleTime: 6 * 1000, // 5 phút,
  });
};

export const useUpdateReadMessages = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ interestId }: { interestId: number }) => {
      const res = await updateReadMessage({ interestId });
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa

      queryClient.invalidateQueries({ queryKey: messageKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
// export const useUpdateItem = (config?: {
//   onSuccess?: () => void;
//   onError?: (err: any) => void;
//   onSettled?: () => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, data }: { id: number; data: UpdateItemDto }) => {
//       console.log("data", data);
//       const res = await updateItem(id, data);
//       console.log("res", res);
//       return res.data!;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: itemKeys.all }); // hoặc list
//       config?.onSuccess?.();
//     },
//     onError: config?.onError,
//     onSettled: config?.onSettled,
//   });
// };
