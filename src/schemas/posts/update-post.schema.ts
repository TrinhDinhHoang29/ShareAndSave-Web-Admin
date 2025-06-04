import { z } from "zod";

export const UpdatePostSchema = z.object({
  status: z.coerce.number().min(1).max(3),
  title: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()).min(1),
});

export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
