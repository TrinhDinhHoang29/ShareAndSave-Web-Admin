import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormDateHaveTime } from "@/components/ui/form-date-have-time";
import { useUpdateAppointment } from "@/hooks/react-query-hooks/use-appointment";
import {
  UpdateAppointmentDto,
  UpdateAppointmentSchema,
} from "@/schemas/appointments/update-appointment.schema";
import { IAppointment } from "@/types/models/appointment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function PopupUpdateAppointment({
  appointment,
}: {
  appointment: IAppointment;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateAppointmentDto>({
    resolver: zodResolver(UpdateAppointmentSchema),
    defaultValues: {
      startTime: new Date(appointment.startTime),
      endTime: new Date(appointment.endTime),
    },
  });
  if (appointment) {
    form.setValue("endTime", new Date(appointment.endTime));
    form.setValue("startTime", new Date(appointment.startTime));
  }
  const updateAppointmentMutation = useUpdateAppointment({
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống vui lòng liên hệ lại sau");
    },
  });
  const onSubmit = (data: UpdateAppointmentDto) => {
    updateAppointmentMutation.mutate({
      id: appointment.id,
      data,
    });
    form.reset(); // reset form
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật thời gian</DialogTitle>
        </DialogHeader>

        <Form {...form} key="old">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="w-full space-y-8"
          >
            <FormDateHaveTime
              control={form.control}
              name="startTime"
              label="Ngày bất đầu"
            />
            <FormDateHaveTime
              control={form.control}
              name="endTime"
              label="Ngày kết thúc"
            />

            <div className="text-center">
              <Button type="submit">Cập nhật phiếu hẹn</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
