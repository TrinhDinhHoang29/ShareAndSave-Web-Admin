import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@/apis/post.api";
import { CreatePostDto } from "@/schemas/posts/create-post.schema";
import { IFilterExtend } from "@/types/filter-api.type";
import { UpdatePostDto } from "@/schemas/posts/update-post.schema";

export const postKeys = {
  all: ["posts"] as const,
  list: (params: IFilterExtend) =>
    [
      "posts",
      params.searchBy ?? "",
      params.postOf,
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.status ?? "",
      params.type ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: number) => ["posts", "detail", id] as const,
};

export const usePosts = (params: IFilterExtend) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: async () => {
      const res = await getPosts(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useCreatePost = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostDto) => {
      const res = await createPost(data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: postKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      console.log("đã gọi");
      const res = await getPost(id);

      return res.data!;
    },
    enabled: id !== 0,
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useUpdatePost = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePostDto }) => {
      const res = await updatePost(id, data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: postKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
export const useDeletePost = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deletePost(id);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

// export const useUser = (id: string) => {
//   return useQuery({
//     queryKey: userKeys.detail(id),
//     queryFn: async () => {
//       const res = await getUser(id);
//       return res.data!;
//     },
//     staleTime: 5 * 60 * 1000, // 5 phút
//   });
// };
// export const useUpdateUser = (config?: {
//   onSuccess?: () => void;
//   onError?: (err: any) => void;
//   onSettled?: () => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: UpdateUserDto) => {
//       const res = await updateUser(data);
//       return res.data!;
//     },
//     onSuccess: (_, { id }) => {
//       // refetch chiến dịch đang sửa
//       queryClient.invalidateQueries({
//         queryKey: userKeys.detail(id.toString()),
//       });
//       queryClient.invalidateQueries({ queryKey: userKeys.all }); // hoặc list
//       config?.onSuccess?.();
//     },
//     onError: config?.onError,
//     onSettled: config?.onSettled,
//   });
// };

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
