import { z } from "zod";

export const CreateTransactionSchema = z.object({
  interestID: z.coerce.number().min(1).optional(),
  method: z.string().optional(),
  items: z.array(
    z.object({
      postItemID: z.coerce.number().min(1),
      quantity: z.coerce.number().min(1),
    })
  ),
});

export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
