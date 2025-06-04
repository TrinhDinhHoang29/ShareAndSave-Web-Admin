import { z } from "zod";

export const CreatePostPersonalInfoSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải chứa ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
});
export const CreatePostInfoSchema = z.object({
  images: z
    .array(z.string().url().or(z.string().startsWith("data:image/")))
    .max(4, "Tối đa 4 ảnh"),
  description: z.string(),
  lostDate: z.string().optional(),
  lostLocation: z.string().optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
  reward: z.string().optional(),
  foundLocation: z.string().optional(),
  foundDate: z.string().optional(),
  title: z.string().min(2, "Tiêu đề phải chứa ít nhất 2 ký tự"),
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
  type: z.coerce.number().min(1, "Vui lòng chọn loại bài đăng"),
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
