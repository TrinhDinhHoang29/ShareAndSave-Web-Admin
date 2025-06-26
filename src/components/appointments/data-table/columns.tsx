import PopupShowItemAppointment from "@/components/appointments/popup-show-item";
import { PopupUpdateAppointment } from "@/components/appointments/popup-update-appointment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IAppointment } from "@/types/models/appointment.type";
import { AppointmentStatus } from "@/types/status.type";
import { formatDate } from "@/utils/format-date";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getColumns = (
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  selectedAppointments: IAppointment[],
  setSelectedAppointments: (appointment: IAppointment[]) => void
): ColumnDef<IAppointment>[] => [
  {
    accessorKey: "checkbox",
    header: "",
    cell: ({ row }) => {
      const item = row.original as IAppointment;
      const isChecked = selectedAppointments.some(
        (selected) => selected.id === item.id
      );

      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => {
            if (checked) {
              // Add item nếu chưa có
              if (!isChecked) {
                setSelectedAppointments([...selectedAppointments, item]);
              }
            } else {
              // Remove item nếu đã có
              setSelectedAppointments(
                selectedAppointments.filter((i) => i.id !== item.id)
              );
            }
          }}
        />
      );
    },
    enableSorting: false,
    size: 10,
  },
  {
    accessorKey: "userName",
    header: "Họ và tên",
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      const isSorted = sorting.find((s) => s.id === column.id);
      const nextDirection = isSorted?.desc ? "asc" : "desc";
      return (
        <Button
          variant="ghost"
          onClick={() => {
            setSorting([{ id: column.id, desc: nextDirection === "desc" }]);
          }}
        >
          Thời gian bất đầu
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startTime = row.getValue("startTime") as string;
      return <Badge variant="outline">{formatDate(startTime)}</Badge>;
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => {
      const isSorted = sorting.find((s) => s.id === column.id);
      const nextDirection = isSorted?.desc ? "asc" : "desc";
      return (
        <Button
          variant="ghost"
          onClick={() => {
            setSorting([{ id: column.id, desc: nextDirection === "desc" }]);
          }}
        >
          Thời gian kết thúc
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endTime = row.getValue("endTime") as string;
      const isExpired = new Date(endTime) < new Date();

      return (
        <Badge variant={isExpired ? "destructive" : "outline"}>
          {formatDate(endTime)}
        </Badge>
      );
    },
  },
  {
    id: "itemCount",
    header: "Tổng món đồ",
    cell: ({ row }: any) => {
      const appointment = row.original as IAppointment;
      return <PopupShowItemAppointment appointment={appointment} />;
    },
  },
  {
    id: "status",
    header: "Trạng thái",
    cell: ({ row }: any) => {
      const appointment = row.original as IAppointment;
      return appointment.status === AppointmentStatus.APPROVED ? (
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          Đã duyệt
        </Badge>
      ) : (
        <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
          Từ chối
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const appointment = row.original as IAppointment;
      return <PopupUpdateAppointment appointment={appointment} />;
    },
  },
];
