import { http } from "@/lib/http";
import { CreateGoodDeedDto } from "@/schemas/good-deeds/create-good-deed.schema";
import { IGoodDeed } from "@/types/models/good-deed.type";
import { IUserReport } from "@/types/models/report.type";
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
const getGoodDeeds = async (
  userID: number
): Promise<IResponseApi<{ goodDeeds: IGoodDeed[] }>> => {
  const response = await api.get(`/users/${userID}/my-good-deeds`);
  return response.data;
};

const getReportGoodDeed = async (): Promise<
  IResponseApi<{ userReports: IUserReport[] }>
> => {
  const response = await api.get(`/users/report`);
  return response.data;
};
const deleteGoodDeed = async (id: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/users/good-deeds/${id}`);
  return response.data;
};

export { createGoodDeed, deleteGoodDeed, getGoodDeeds, getReportGoodDeed };
