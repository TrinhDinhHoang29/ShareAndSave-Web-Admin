import { z } from "zod";

export const UpdateItemSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional(),
  categoryID: z.coerce.number().min(1),
  image: z.string().optional(),
});

export type UpdateItemDto = z.infer<typeof UpdateItemSchema>;
