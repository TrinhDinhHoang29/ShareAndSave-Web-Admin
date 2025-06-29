import { z } from "zod";

export const UpdatePostSchema = z.object({
  status: z.coerce.number().min(1).max(3),
  title: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()).min(1),
  isFeatured: z.coerce.number().min(0, "Vui lòng chọn nổi bật").max(1, {
    message: "Vui lòng chọn nổi bật",
  }),
});

export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
