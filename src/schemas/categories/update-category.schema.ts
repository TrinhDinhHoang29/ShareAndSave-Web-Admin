import { z } from "zod";

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Tên loại chiến dịch không được để trống"),
});
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
