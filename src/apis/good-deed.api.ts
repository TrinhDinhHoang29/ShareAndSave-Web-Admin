import { http } from "@/lib/http";
import { CreateGoodDeedDto } from "@/schemas/good-deeds/create-good-deed.schema";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const createGoodDeed = async (
  createGoodDeedDto: CreateGoodDeedDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/users/good-deeds`, {
    ...createGoodDeedDto,
  });

  return response.data;
};

const deleteGoodDeed = async (id: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/users/good-deeds/${id}`);
  return response.data;
};

export { createGoodDeed, deleteGoodDeed };
