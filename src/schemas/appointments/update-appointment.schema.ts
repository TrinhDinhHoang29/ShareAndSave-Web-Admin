import { z } from "zod";

export const UpdateAppointmentSchema = z.object({
  startTime: z.coerce.date({
    required_error: "Vui lòng chọn thời gian bắt đầu",
    invalid_type_error: "Thời gian bắt đầu không hợp lệ",
  }),
  endTime: z.coerce.date({
    required_error: "Vui lòng chọn thời gian kết thúc",
    invalid_type_error: "Thời gian kết thúc không hợp lệ",
  }),
  status: z.coerce.number().optional(),
});

export type UpdateAppointmentDto = z.infer<typeof UpdateAppointmentSchema>;
