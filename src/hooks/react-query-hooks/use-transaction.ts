import { createInterest } from "@/apis/interest.api";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
} from "@/apis/transaction.api";
import { interestKeys } from "@/hooks/react-query-hooks/use-interest";
import { postKeys } from "@/hooks/react-query-hooks/use-post";
import { CreateTransactionDto } from "@/schemas/trasactions/create-transaction.schema";
import { IFilterTransaction } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const transactionKeys = {
  all: ["transactions"] as const,
  list: (params: IFilterTransaction) =>
    [
      "transactions",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.status ?? "",
      params.postID ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: string) => ["transactions", "detail", id] as const,
};
export const useGetTransactions = (params: IFilterTransaction) => {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: async () => {
      const res = await getTransactions(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useCreateTransaction = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (CreateTransactionDto: CreateTransactionDto) => {
      const res = await createTransaction(CreateTransactionDto);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
export const useUpdateTransaction = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: number }) => {
      const res = await updateTransaction(id, status);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: interestKeys.all });
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
// export const useDeleteInterest = (config?: {
//   onSuccess?: () => void;
//   onError?: (err: any) => void;
//   onSettled?: () => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (postID: number) => {
//       const res = await deleteInterest(postID);
//       return res.data!;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: interestKeys.all });
//       queryClient.invalidateQueries({ queryKey: postKeys.all });
//       config?.onSuccess?.();
//     },
//     onError: config?.onError,
//     onSettled: config?.onSettled,
//   });
// };
// export const useInterests = (params: IFilterInterest) => {
//   return useQuery({
//     queryKey: interestKeys.list(params),
//     queryFn: async () => {
//       const res = await getInterests(params);
//       return res.data!;
//     },
//     staleTime: 5 * 60 * 1000, // 5 phút,
//   });
// };
// export const useInterest = (id: string) => {
//   return useQuery({
//     queryKey: interestKeys.detail(id),
//     queryFn: async () => {
//       const res = await getInterest(id);
//       return res.data!;
//     },
//     staleTime: 5 * 60 * 1000, // 5 phút,
//   });
// };
