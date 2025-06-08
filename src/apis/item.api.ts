import { http } from "@/lib/http";
import { CreateItemDto } from "@/schemas/items/create-item.schema";
import { UpdateItemDto } from "@/schemas/items/update-item.schema";
import { IFilterApi } from "@/types/filter-api.type";
import { IItem } from "@/types/item.type";
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
const updateItem = async (
  id: number,
  UpdateItemDto: UpdateItemDto
): Promise<IResponseApi<{ item: IItem }>> => {
  const response = await api.patch(`/items/${id}`, UpdateItemDto);
  return response.data;
};
const deleteItem = async (id: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};
export { createItems, getItems, updateItem, deleteItem };
