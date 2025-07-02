import { http } from "@/lib/http";
import { IFilterInterest } from "@/types/filter-api.type";
import { IInterest } from "@/types/models/interests.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const createInterest = async (postID: number): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/interests`, { postID });
  return response.data;
};
const deleteInterest = async (postID: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/interests/${postID}`);
  return response.data;
};
const getInterests = async ({
  limit,
  order,
  page,
  search,
  type,
}: IFilterInterest): Promise<
  IResponseApi<{ interests: IInterest[]; totalPage: number }>
> => {
  const response = await api.get(`/interests`, {
    params: {
      limit,
      order,
      page,
      search,
      sort: "createdAt",
      type,
    },
  });

  return response.data;
};
const getInterest = async (
  id: string
): Promise<IResponseApi<{ interest: IInterest }>> => {
  const response = await api.get(`/interests/${id}`);
  return response.data;
};
export { createInterest, deleteInterest, getInterests, getInterest };
