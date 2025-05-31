import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteUser, getUser, getUsers, updateUser } from "@/apis/user.api";
import { IFilterApi } from "@/types/filter-api.type";
import { UpdateUserDto } from "@/schemas/users/update-user.schema";

export const userKeys = {
  all: ["users"] as const,
  list: (params: IFilterApi) =>
    [
      "users",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: string) => ["users", "detail", id] as const,
};

export const useUsers = (params: IFilterApi) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const res = await getUsers(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useDeleteUser = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteUser(id);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await getUser(id);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};
export const useUpdateUser = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const res = await updateUser(data);
      return res.data!;
    },
    onSuccess: (_, { id }) => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(id.toString()),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

// export const useCreateCampaign = (config?: {
// 	onSuccess?: () => void
// 	onError?: (err: any) => void
// 	onSettled?: () => void
// }) => {
// 	const queryClient = useQueryClient()

// 	return useMutation(
// 		{
// 			mutationFn: async (data: CreateCampaignDto) => {
// 				const res = await createCampaign(data)
// 				return res.data!
// 			},
// 			onSuccess: () => {
// 				queryClient.invalidateQueries({ queryKey: ['campaigns'] })
// 				config?.onSuccess?.()
// 			},
// 			onError: config?.onError,
// 			onSettled: config?.onSettled
// 		} // spread cho phép config tuỳ biến
// 	)
// }
