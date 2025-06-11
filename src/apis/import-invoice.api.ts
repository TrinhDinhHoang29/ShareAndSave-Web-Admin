import { http } from "@/lib/http";
import { CreateImportInvoiceDto } from "@/schemas/import-invoices/create-import-invoice";
import { IFilterApi } from "@/types/filter-api.type";
import { IImportInvoice } from "@/types/models/import-invoice.type";
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
const createImportInvoice = async (
  CreateImportInvoiceDto: CreateImportInvoiceDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/import-invoice`, CreateImportInvoiceDto);
  return response.data;
};
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
export { createImportInvoice, getImportInvoices };
