import { http } from "@/lib/http";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const getStatictisTransactionByYear = async ({
  year,
}: {
  year: number;
}): Promise<IResponseApi<{ totals: [] }>> => {
  const response = await api.get(`/statistics/transaction/${year}`);
  return response.data;
};
const getStatictisTransaction = async (): Promise<
  IResponseApi<{ total: number; totalLastMonth: number }>
> => {
  const response = await api.get(`/statistics/transaction`);
  return response.data;
};

const getStatictisPost = async (): Promise<
  IResponseApi<{ total: number; totalLastMonth: number }>
> => {
  const response = await api.get(`/statistics/post`);
  return response.data;
};

const getStatictisItemWarehouse = async (): Promise<
  IResponseApi<{ total: number; totalLastMonth: number }>
> => {
  const response = await api.get(`/statistics/item-warehouse`);
  return response.data;
};

const getStatictisUser = async (): Promise<
  IResponseApi<{ total: number; totalLastMonth: number }>
> => {
  const response = await api.get(`/statistics/user`);
  return response.data;
};
export {
  getStatictisTransactionByYear,
  getStatictisTransaction,
  getStatictisUser,
  getStatictisItemWarehouse,
  getStatictisPost,
};
