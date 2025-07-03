import {
  getStatictisItemWarehouse,
  getStatictisPost,
  getStatictisTransaction,
  getStatictisTransactionByYear,
  getStatictisUser,
} from "@/apis/statistic.api";
import { useQueries, useQuery } from "@tanstack/react-query";

export const statisticKeys = {
  all: ["statistic"] as const,
  statisticTransactionByYear: (year: number) =>
    ["statistic", "statistic-transaction-by-year", year] as const,
  statisticTransaction: ["statistic", "statistic-transaction"] as const,
  statisticUser: ["statistic", "statistic-user"] as const,
  statisticPost: ["statistic", "statistic-post"] as const,
  statisticItemWarehouse: ["statistic", "statistic-item-warehouse"] as const,
};

export const useStatisticTransactionByYear = ({ year }: { year: number }) => {
  return useQuery({
    queryKey: statisticKeys.statisticTransactionByYear(year),
    queryFn: async () => {
      const res = await getStatictisTransactionByYear({ year });
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useStatisticTransaction = () => {
  return useQuery({
    queryKey: statisticKeys.statisticTransaction,
    queryFn: async () => {
      const res = await getStatictisTransaction();
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useStatisticUser = () => {
  return useQuery({
    queryKey: statisticKeys.statisticUser,
    queryFn: async () => {
      const res = await getStatictisUser();
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useStatisticPost = () => {
  return useQuery({
    queryKey: statisticKeys.statisticPost,
    queryFn: async () => {
      const res = await getStatictisPost();
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export const useStatisticItemWarehouse = () => {
  return useQuery({
    queryKey: statisticKeys.statisticItemWarehouse,
    queryFn: async () => {
      const res = await getStatictisItemWarehouse();
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
export function useAllStatistics() {
  const results = useQueries({
    queries: [
      {
        queryKey: statisticKeys.statisticTransaction,
        queryFn: async () => (await getStatictisTransaction()).data,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: statisticKeys.statisticUser,
        queryFn: async () => (await getStatictisUser()).data,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: statisticKeys.statisticPost,
        queryFn: async () => (await getStatictisPost()).data,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: statisticKeys.statisticItemWarehouse,
        queryFn: async () => (await getStatictisItemWarehouse()).data,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  // results là mảng, mỗi phần tử có: data, isLoading, isError, error, ...
  return results;
}
