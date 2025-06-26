import { getAppointments, updateAppointment } from "@/apis/appointment.api";
import { getItemWarehouse, getItemWarehouses } from "@/apis/item-warehouse.api";
import { UpdateAppointmentDto } from "@/schemas/appointments/update-appointment.schema";
import { IFilterApi } from "@/types/filter-api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const appointmentKeys = {
  all: ["appointments"] as const,
  list: (params: IFilterApi) =>
    [
      "appointments",
      params.searchBy ?? "",
      params.searchValue ?? "",
      params.order ?? "",
      params.sort ?? "",
      params.page ?? 1,
      params.limit ?? 10,
    ] as const,
  detail: (id: string) => ["item-appointments", "detail", id] as const,
};

export const useAppointments = (params: IFilterApi) => {
  return useQuery({
    queryKey: appointmentKeys.list(params),
    queryFn: async () => {
      const res = await getAppointments(params);
      return res.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 phút,
  });
};

export const useUpdateAppointment = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateAppointmentDto;
    }) => {
      const res = await updateAppointment({ id, data });
      return res.data!;
    },
    onSuccess: () => {
      // refetch chiến dịch đang sửa
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all }); // hoặc list
      config?.onSuccess?.();
    },
    onError: config?.onError,
    onSettled: config?.onSettled,
  });
};
