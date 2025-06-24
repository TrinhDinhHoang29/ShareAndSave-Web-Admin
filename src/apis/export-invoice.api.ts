import { http } from "@/lib/http";
import { CreateExportInvoiceDto } from "@/schemas/export-invoices/create-export-invoice";
import { IFilterApi } from "@/types/filter-api.type";
import { IExportInvoice } from "@/types/models/export-invoice.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getExportInvoices = async ({
  searchBy,
  searchValue,
  sort,
  order,
  page,
  limit,
}: IFilterApi): Promise<
  IResponseApi<{ exportInvoices: IExportInvoice[]; totalPage: number }>
> => {
  const response = await api.get(
    `/export-invoice?page=${page}&limit=${limit}`,
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
const createExportInvoice = async (
  CreateExportInvoiceDto: CreateExportInvoiceDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/export-invoice`, CreateExportInvoiceDto);
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
export { createExportInvoice, getExportInvoices };
