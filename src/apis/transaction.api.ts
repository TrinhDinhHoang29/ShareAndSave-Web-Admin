import { http } from "@/lib/http";
import { CreateTransactionDto } from "@/schemas/trasactions/create-transaction.schema";
import { IFilterTransaction } from "@/types/filter-api.type";
import { ITransaction } from "@/types/models/transaction.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getTransactions = async ({
  searchBy,
  searchValue,
  sort,
  postID,
  status,
  order,
  page = 1,
  limit = 10,
}: IFilterTransaction): Promise<
  IResponseApi<{ transactions: ITransaction[]; totalPage: number }>
> => {
  const response = await api.get(`/transactions?page=${page}&limit=${limit}`, {
    params: {
      postID,
      status,
      searchBy,
      searchValue,
      sort,
      order,
    },
  });
  return response.data;
};
const createTransaction = async (
  createTransactionDto: CreateTransactionDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/transactions`, createTransactionDto);
  return response.data;
};
const updateTransaction = async (
  id: number,
  status: number
): Promise<IResponseApi<{}>> => {
  const response = await api.patch(`/transactions/${id}`, {
    status,
  });
  return response.data;
};

export { createTransaction, getTransactions, updateTransaction };
