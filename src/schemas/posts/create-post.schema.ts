import { z } from "zod";

export const CreatePostPersonalInfoSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải chứa ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
});
export const CreatePostInfoSchema = z.object({
  images: z
    .array(
      z
        .string({ message: "Vui lòng chọn ảnh" })
        .url({ message: "Ảnh phải là đường dẫn hợp lệ" })
        .or(
          z.string().startsWith("data:image/", { message: "Ảnh không hợp lệ" })
        )
    )
    .nonempty({ message: "Vui lòng chọn ít nhất 1 ảnh" })
    .max(4, { message: "Chỉ được chọn tối đa 4 ảnh" }),

  description: z.string({ message: "Mô tả không được để trống" }),
  lostDate: z.coerce
    .date()
    .max(new Date(), { message: "Ngày mất phải nhỏ hơn hoặc bằng hôm nay" })
    .optional(),

  lostLocation: z.string().optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
  reward: z.string().optional(),
  foundLocation: z.string().optional(),
  foundDate: z.coerce
    .date()
    .max(new Date(), { message: "Ngày nhặt phải nhỏ hơn hoặc bằng hôm nay" })
    .optional(),
  title: z
    .string({ message: "Tiêu đề phải chứa ít nhất 2 ký tự" })
    .min(2, "Tiêu đề phải chứa ít nhất 2 ký tự"),
  newItems: z
    .array(
      z.object({
        categoryID: z.coerce.number(),
        name: z.string(),
        quantity: z.number(),
        image: z.string(),
      })
    )
    .optional(),
  oldItems: z
    .array(
      z.object({
        quantity: z.coerce.number(),
        itemID: z.coerce.number(),
        image: z.string(),
      })
    )
    .optional(),
});
export const CreatePostTypeSchema = z.object({
  type: z.coerce
    .number({ message: "Vui lòng chọn loại bài đăng" })
    .min(1, "Vui lòng chọn loại bài đăng"),
});
export type CreatePostTypeDto = z.infer<typeof CreatePostTypeSchema>;

export type CreatePostPersonalInfoDto = z.infer<
  typeof CreatePostPersonalInfoSchema
>;
export type CreatePostInfoDto = z.infer<typeof CreatePostInfoSchema>;

export const CreatePostSchema = z.object({
  images: z
    .array(z.string().url().or(z.string().startsWith("data:image/")))
    .max(4, "Tối đa 4 ảnh"),
  description: z.string(),
  info: z.string(),
  title: z.string().min(2, "Tiêu đề phải chứa ít nhất 2 ký tự"),
  type: z.coerce.number().min(1, "Vui lòng chọn loại bài đăng"),
  newItems: z
    .array(
      z.object({
        categoryID: z.coerce.number(),
        name: z.string(),
        quantity: z.number(),
        image: z.string(),
      })
    )
    .optional(),
  oldItems: z
    .array(
      z.object({
        quantity: z.coerce.number(),
        itemID: z.coerce.number(),
        image: z.string(),
      })
    )
    .optional(),
});
export type CreatePostDto = z.infer<typeof CreatePostSchema>;
