import { http } from "@/lib/http";
import { IFilterApi } from "@/types/filter-api.type";
import { INotification } from "@/types/models/notification.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const getNotifications = async ({
  limit,
  page,
}: IFilterApi): Promise<
  IResponseApi<{ notifications: INotification[]; totalPage: number }>
> => {
  const response = await api.get(`/notifications`, {
    params: {
      limit,
      page,
    },
  });
  return response.data;
};

export { getNotifications };
