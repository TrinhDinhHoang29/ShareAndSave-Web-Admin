import { http } from "@/lib/http";
import { CreateItemDto } from "@/schemas/items/create-item.schema";
import { IFilterApi, IFilterExtend } from "@/types/filter-api.type";
import { IItem } from "@/types/item.type";
import { IPost } from "@/types/post.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getItems = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page = 1,
  limit = 10,
}: IFilterApi): Promise<
  IResponseApi<{ items: IItem[]; totalPage: number }>
> => {
  const response = await api.get(`/items?page=${page}&limit=${limit}`, {
    params: {
      searchBy,
      searchValue,
      sort,
      order,
    },
  });
  return response.data;
};
const createItems = async (
  createItemDto: CreateItemDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/items`, createItemDto);
  return response.data;
};
export { getItems, createItems };
