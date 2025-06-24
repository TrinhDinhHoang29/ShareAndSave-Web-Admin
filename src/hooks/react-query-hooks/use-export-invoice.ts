import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createExportInvoice,
  getExportInvoices,
} from "@/apis/export-invoice.api";
import { CreateExportInvoiceDto } from "@/schemas/export-invoices/create-export-invoice";
import { IFilterApi } from "@/types/filter-api.type";

export const exportInvoiceKeys = {
  all: ["export-invoices"] as const,
  list: (params: IFilterApi) =>
    [
      "export-invoices",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: number) => ["export-invoices", "detail", id] as const,
};

export const useExportInvoices = (params: IFilterApi) => {
  return useQuery({
    queryKey: exportInvoiceKeys.list(params),
    queryFn: async () => {
      const res = await getExportInvoices(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useCreateExportInvoice = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExportInvoiceDto) => {
      const res = await createExportInvoice(data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: exportInvoiceKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};

// export const usePost = (id: number) => {
//   return useQuery({
//     queryKey: postKeys.detail(id),
//     queryFn: async () => {
//       console.log("đã gọi");
//       const res = await getPost(id);

//       return res.data!;
//     },
//     enabled: id !== 0,
//     staleTime: 5 * 60 * 1000, // 5 phút,
//   });
// };

// export const useUpdatePost = (config?: {
//   onSuccess?: () => void;
//   onError?: (err: any) => void;
//   onSettled?: () => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, data }: { id: number; data: UpdatePostDto }) => {
//       const res = await updatePost(id, data);
//       return res.data!;
//     },
//     onSuccess: () => {
//       // refetch chiến dịch đang sửa
//       queryClient.invalidateQueries({ queryKey: postKeys.all }); // hoặc list
//       config?.onSuccess?.();
//     },
//     onError: config?.onError,
//     onSettled: config?.onSettled,
//   });
// };
