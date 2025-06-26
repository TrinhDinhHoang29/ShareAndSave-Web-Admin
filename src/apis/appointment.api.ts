import { http } from "@/lib/http";
import { UpdateAppointmentDto } from "@/schemas/appointments/update-appointment.schema";
import { IFilterApi } from "@/types/filter-api.type";
import { IAppointment } from "@/types/models/appointment.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getAppointments = async (
  params: IFilterApi
): Promise<
  IResponseApi<{ appointments: IAppointment[]; totalPage: number }>
> => {
  const response = await api.get(`/appointments`, {
    params: params,
  });
  return response.data;
};
const updateAppointment = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateAppointmentDto;
}): Promise<IResponseApi<{}>> => {
  const response = await api.patch(`/appointments/${id}`, data);
  return response.data;
};
export { getAppointments, updateAppointment };
