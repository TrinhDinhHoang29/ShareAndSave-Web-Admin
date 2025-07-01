import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGoodDeed,
  deleteGoodDeed,
  getGoodDeeds,
} from "@/apis/good-deed.api";
import { CreateGoodDeedDto } from "@/schemas/good-deeds/create-good-deed.schema";
import { userKeys } from "@/hooks/react-query-hooks/use-users";

// Chuẩn hóa keys: phân biệt từng user
export const goodDeedKeys = {
  all: ["good-deeds"] as const,
  list: (userId?: number) =>
    userId
      ? (["good-deeds", "list", userId] as const)
      : (["good-deeds", "list"] as const),
  detail: (id: number) => ["good-deeds", "detail", id] as const,
};

// Tạo việc tốt
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
    onSuccess: (_, variables) => {
      // Lấy userId từ dữ liệu vừa tạo (nếu có)
      // Giả sử CreateGoodDeedDto có userID:
      queryClient.invalidateQueries({ queryKey: goodDeedKeys.all });
      if (variables?.userID) {
        queryClient.invalidateQueries({
          queryKey: goodDeedKeys.list(Number(variables.userID)),
        });
      }
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

// Xoá việc tốt
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
    onSuccess: (_, id) => {
      // Không rõ API deleteGoodDeed trả về userId? Nếu có thì nên invalidate key của user đó.
      queryClient.invalidateQueries({ queryKey: goodDeedKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

// Lấy danh sách việc tốt theo userId
export const useGoodDeedByUserId = (userId: number) => {
  return useQuery({
    queryKey: goodDeedKeys.list(userId),
    queryFn: async () => {
      const res = await getGoodDeeds(userId);
      return res.data!;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
