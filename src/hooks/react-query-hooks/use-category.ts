import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/apis/category.api";
import { CreateCategoryDto } from "@/schemas/categories/create-category.chema";
import { UpdateCategoryDto } from "@/schemas/categories/update-category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const categoryKeys = {
  all: ["categories"] as const,

  detail: (id: number) => ["categories", "detail", id] as const,
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
export const useCreateCategory = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: async (data: CreateCategoryDto) => {
        const res = await createCategory(data);
        return res.data!;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
      onSettled: config?.onSettled,
    } // spread cho phép config tuỳ biến
  );
};

export const useUpdateCategory = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: async ({
        id,
        data,
      }: {
        id: number;
        data: UpdateCategoryDto;
      }) => {
        const res = await updateCategory(id, data);
        return res.data!;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
      onSettled: config?.onSettled,
    } // spread cho phép config tuỳ biến
  );
};
export const useDeleteCategory = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: async (id: number) => {
        const res = await deleteCategory(id);
        return res.data!;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        config?.onSuccess?.();
      },
      onError: config?.onError,
      onSettled: config?.onSettled,
    } // spread cho phép config tuỳ biến
  );
};
