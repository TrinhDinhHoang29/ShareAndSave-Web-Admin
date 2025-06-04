import { z } from "zod";

export const CreateItemSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional(),
  categoryID: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
  image: z.string().min(1, "Ảnh không được để trống"),
});

export type CreateItemDto = z.infer<typeof CreateItemSchema>;
