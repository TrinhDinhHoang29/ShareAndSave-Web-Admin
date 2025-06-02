import { http } from "@/lib/http";
import { ICategory } from "@/types/category.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const getCategories = async (): Promise<
  IResponseApi<{ categories: ICategory[] }>
> => {
  const response = await api.get(`/categories`);
  return response.data;
};
export { getCategories };
