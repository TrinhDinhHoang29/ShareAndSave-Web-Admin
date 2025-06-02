import { getCategories } from "@/apis/category.api";
import { useQuery } from "@tanstack/react-query";
export const categoryKeys = {
  all: ["categories"] as const,

  detail: (id: string) => ["categories", "detail", id] as const,
};

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: async () => {
      const res = await getCategories();
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};
