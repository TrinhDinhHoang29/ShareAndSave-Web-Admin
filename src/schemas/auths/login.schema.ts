import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email chưa đúng định dạng")
    .min(6, "Số điện thoại phải từ 10 ký tự trở lên"),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái in hoa")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
