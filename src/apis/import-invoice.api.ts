import { http } from "@/lib/http";
import { IFilterApi, IFilterExtend } from "@/types/filter-api.type";
import { IImportInvoice } from "@/types/import-invoice.type";
import { IPost } from "@/types/post.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getImportInvoices = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page,
  limit,
}: IFilterApi): Promise<
  IResponseApi<{ importInvoices: IImportInvoice[]; totalPage: number }>
> => {
  const response = await api.get(
    `/import-invoice?page=${page}&limit=${limit}`,
    {
      params: {
        searchBy,
        searchValue,
        sort,
        order,
      },
    }
  );
  return response.data;
};
// const createPost = async (
//   createItemDto: CreatePostDto
// ): Promise<IResponseApi<{}>> => {
//   const response = await api.post(`/posts`, createItemDto);
//   return response.data;
// };
// const updatePost = async (
//   id: number,
//   updatePostDto: UpdatePostDto
// ): Promise<IResponseApi<{}>> => {
//   const response = await api.patch(`/posts/${id}`, updatePostDto);
//   return response.data;
// };
// const getPost = async (id: number): Promise<IResponseApi<{ post: IPost }>> => {
//   const response = await api.get(`/posts/${id}`);
//   console.log("res", response.data);
//   return response.data;
// };
export { getImportInvoices };
