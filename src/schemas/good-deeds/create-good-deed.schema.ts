import { z } from "zod";

export const CreateGoodDeedSchema = z.object({
  goodDeedType: z.coerce
    .number()
    .min(1, "Tên loại việc tốt không được để trống")
    .max(3),
  transactionID: z.coerce.number().optional(),
  userID: z.coerce.number().optional(),
});

export type CreateGoodDeedDto = z.infer<typeof CreateGoodDeedSchema>;
