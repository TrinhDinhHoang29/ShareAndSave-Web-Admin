import { http } from "@/lib/http";
import { CreateCategoryDto } from "@/schemas/categories/create-category.chema";
import { UpdateCategoryDto } from "@/schemas/categories/update-category.schema";
import { ICategory } from "@/types/models/category.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const getCategories = async (): Promise<
  IResponseApi<{ categories: ICategory[] }>
> => {
  const response = await api.get(`/categories`);
  return response.data;
};
const createCategory = async (
  data: CreateCategoryDto
): Promise<IResponseApi<{ category: ICategory }>> => {
  const response = await api.post("/categories", data);
  return response.data;
};
const updateCategory = async (
  id: number,
  data: UpdateCategoryDto
): Promise<IResponseApi<{ category: ICategory }>> => {
  const response = await api.patch(`/categories/${id}`, data);
  return response.data;
};
const deleteCategory = async (id: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
export { getCategories, createCategory, deleteCategory, updateCategory };
