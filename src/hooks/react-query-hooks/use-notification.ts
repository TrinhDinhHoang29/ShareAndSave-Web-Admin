import {
  getNotifications,
  updateReadNotification,
} from "@/apis/notification.api";
import { IFilterApi } from "@/types/filter-api.type";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const notificationKeys = {
  all: ["notifications"],
  list: (params: IFilterApi) =>
    ["notifications", params.page ?? 1, params.limit ?? 10] as const,
};

export const useNotification = (params: IFilterApi) => {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(params),
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getNotifications({ ...params, page: pageParam });
      return res.data!;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // Số trang đã tải là pages.length, tổng trang là lastPage.totalPage
      if (pages.length < lastPage.totalPage) {
        // Tải tiếp trang tiếp theo
        return pages.length + 1;
      }
      // Hết trang, không trả về nữa
      return undefined;
    },
  });
};
export const useUpdateReadNotitication = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await updateReadNotification();
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
