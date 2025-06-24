import { z } from "zod";

export const CreateExportInvoiceSchema = z.object({
  classify: z.coerce
    .number({
      required_error: "Vui lòng chọn loại phiếu xuất kho",
      invalid_type_error: "Loại phiếu xuất kho không hợp lệ",
    })
    .min(1, { message: "Loại phiếu xuất kho tối thiểu là 1" })
    .max(2, { message: "Loại phiếu xuất kho tối đa là 2" }),

  description: z.coerce.string().optional(),

  itemExportInvoice: z
    .array(
      z.object({
        itemWarehouseID: z.coerce
          .number({
            required_error: "Vui lòng chọn sản phẩm",
            invalid_type_error: "ID sản phẩm không hợp lệ",
          })
          .min(1, { message: "ID sản phẩm phải lớn hơn 0" }),
      })
    )
    .optional(),

  receiverID: z.coerce
    .number({
      required_error: "Vui lòng chọn người nhận",
      invalid_type_error: "ID người nhận không hợp lệ",
    })
    .min(1, { message: "ID người nhận chưa có" }),
});

export type CreateExportInvoiceDto = z.infer<typeof CreateExportInvoiceSchema>;
