import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Tên loại chiến dịch không được để trống"),
});

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
