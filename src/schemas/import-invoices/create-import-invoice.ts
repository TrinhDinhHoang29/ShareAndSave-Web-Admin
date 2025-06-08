import { z } from "zod";

export const CreateImportInvoiceSchema = z.object({
  classify: z.coerce
    .number({
      required_error: "Vui lòng chọn loại phiếu nhập kho",
      invalid_type_error: "Loại phiếu nhập kho không hợp lệ",
    })
    .min(0, { message: "Loại phiếu nhập kho tối thiểu là 0" })
    .max(2, { message: "Loại phiếu nhập kho tối đa là 2" }),

  description: z.coerce.string().optional(),

  itemImportInvoice: z
    .array(
      z.object({
        description: z.string().optional(),

        itemID: z.coerce
          .number({
            required_error: "Vui lòng chọn sản phẩm",
            invalid_type_error: "ID sản phẩm không hợp lệ",
          })
          .min(1, { message: "ID sản phẩm phải lớn hơn 0" }),

        quantity: z.coerce
          .number({
            required_error: "Vui lòng nhập số lượng",
            invalid_type_error: "Số lượng không hợp lệ",
          })
          .min(1, { message: "Số lượng phải lớn hơn hoặc bằng 1" }),
      })
    )
    .optional(),

  senderID: z.coerce
    .number({
      required_error: "Vui lòng chọn người gửi",
      invalid_type_error: "ID người gửi không hợp lệ",
    })
    .min(1, { message: "ID người gửi phải lớn hơn 0" }),
});

export type CreateImportInvoiceDto = z.infer<typeof CreateImportInvoiceSchema>;
