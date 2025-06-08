import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createImportInvoice,
  getImportInvoices,
} from "@/apis/import-invoice.api";
import { IFilterApi, IFilterExtend } from "@/types/filter-api.type";
import { CreateImportInvoiceDto } from "@/schemas/import-invoices/create-import-invoice";

export const importInvoiceKeys = {
  all: ["import-invoices"] as const,
  list: (params: IFilterApi) =>
    [
      "import-invoices",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: number) => ["import-invoices", "detail", id] as const,
};

export const useImportInvoices = (params: IFilterExtend) => {
  return useQuery({
    queryKey: importInvoiceKeys.list(params),
    queryFn: async () => {
      const res = await getImportInvoices(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useCreateImportInvoice = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateImportInvoiceDto) => {
      const res = await createImportInvoice(data);
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: importInvoiceKeys.all }); // hoặc list
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
