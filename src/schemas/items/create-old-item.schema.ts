import { z } from "zod";

export const CreateOldItemSchema = z.object({
  id: z.coerce.number(),
  quantity: z.coerce.number().min(1),
  image: z.string().min(1, "Ảnh không được để trống"),
  name: z.string().optional(),
});

export type CreateOldItemDto = z.infer<typeof CreateOldItemSchema>;
