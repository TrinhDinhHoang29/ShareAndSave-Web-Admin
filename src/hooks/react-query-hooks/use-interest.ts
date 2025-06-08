import {
  createInterest,
  deleteInterest,
  getInterests,
} from "@/apis/interest.api";
import { postKeys } from "@/hooks/react-query-hooks/use-post";
import { IFilterInterest } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const interestKeys = {
  all: ["interests"] as const,
  list: (params: IFilterInterest) =>
    [
      "interests",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.type ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: string) => ["interests", "detail", id] as const,
};

export const useCreateInterest = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postID: number) => {
      const res = await createInterest(postID);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interestKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.all });

      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
export const useDeleteInterest = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postID: number) => {
      const res = await deleteInterest(postID);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interestKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
export const useInterests = (params: IFilterInterest) => {
  return useQuery({
    queryKey: interestKeys.list(params),
    queryFn: async () => {
      const res = await getInterests(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
