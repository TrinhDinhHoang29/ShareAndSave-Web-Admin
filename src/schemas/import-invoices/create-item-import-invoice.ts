import { z } from "zod";

export const CreateItemImportInvoiceSchema = z.object({
  name: z
    .string({ message: "Vui lòng chọn sản phẩm" })
    .min(1, { message: "Vui lòng chọn sản phẩm" }),
  description: z.string().optional(),
  itemID: z.coerce.number().min(1),
  quantity: z.coerce
    .number({ message: "Số lượng phải là số" })
    .min(1, { message: "Số lượng phải lớn hơn 0" }),
});

export type CreateItemImportInvoiceDto = z.infer<
  typeof CreateItemImportInvoiceSchema
>;
