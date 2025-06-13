import { z } from "zod";

export const UpdateWarehouseSchema = z.object({
  description: z.string().optional(),
  itemWarehouses: z
    .array(
      z.object({
        id: z.number(),
        description: z.string().optional(),
      })
    )
    .optional(),
  stockPlace: z.string().optional(),
});

export type UpdateWarehouseDto = z.infer<typeof UpdateWarehouseSchema>;
