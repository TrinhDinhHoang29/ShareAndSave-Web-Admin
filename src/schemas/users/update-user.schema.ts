import { z } from "zod";

export const UpdateUserSchema = z.object({
  address: z.string().optional(),
  avatar: z.string().optional(),
  fullName: z.string().min(1, "Tên không được để trống"),
  goodPoint: z.coerce
    .number({
      required_error: "Điểm tốt không được để trống",
    })
    .min(0, "Điểm tốt không được nhỏ hơn 0"),
  id: z.coerce.number({
    required_error: "Id không được để trống",
  }),
  major: z.string().optional(),
  phoneNumber: z.string().min(10, "Số điện thoại không được để trống"),
  status: z.coerce.number().min(0).max(1),
  roleID: z.coerce.number().min(0).max(1),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
