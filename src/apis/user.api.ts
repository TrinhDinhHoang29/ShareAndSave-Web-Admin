import { http } from "@/lib/http";
import { UpdateUserDto } from "@/schemas/users/update-user.schema";
import { IFilterApi } from "@/types/filter-api.type";
import { IResponseApi } from "@/types/response-api.type";
import { IUser } from "@/types/models/user.type";
const api = http();

const getUsers = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page,
  limit,
}: IFilterApi): Promise<
  IResponseApi<{ users: IUser[]; totalPage: number }>
> => {
  const response = await api.get(`/users?page=${page}&limit=${limit}`, {
    params: {
      searchBy,
      searchValue,
      sort,
      order,
    },
  });
  return response.data;
};
const getUser = async (id: string): Promise<IResponseApi<{ user: IUser }>> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

const updateUser = async (
  user: UpdateUserDto
): Promise<IResponseApi<{ user: IUser }>> => {
  const response = await api.put(`/users`, user);
  return response.data;
};
const deleteUser = async (id: string): Promise<IResponseApi<null>> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
export { getUsers, deleteUser, getUser, updateUser };
