import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.type";
import { ArrowUpDown, IdCard } from "lucide-react";
import { PopupUpdateUser } from "@/components/users/popup-update";

export const getColumns = (
  onDelete: (id: string) => void,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedUser: (user: IUser) => void,
  setOpenSheet: (open: boolean) => void
): ColumnDef<IUser>[] => [
  {
    accessorKey: "fullName",
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
          Họ và tên
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original as IUser;
      return (
        <Button
          variant="link"
          className="p-0 text-left font-medium  hover:underline text-black dark:text-white"
          onClick={() => {
            setSelectedUser(user);
            setOpenSheet(true);
          }}
        >
          {user.fullName}
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "email",
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
          Email
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "major",
    header: "Chuyên ngành",
  },
  {
    accessorKey: "goodPoint",
    header: "Điểm tốt",
    cell: ({ row }) => `${row.getValue("goodPoint")} điểm`,
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value = row.getValue("status") as number;
      return (
        <Badge
          variant="destructive"
          className={value ? "bg-green-500 dark:bg-green-500" : "bg-red-500"}
        >
          {value ? `Hoạt động` : `Ngừng hoạt động`}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const id: string = row.original.id;
      return (
        <div className="flex items-center gap-2">
          <PopupUpdateUser id={id} />
          <Button
            variant="outline"
            className="bg-red-600"
            onClick={() => onDelete(id)}
          >
            Xoá
          </Button>
        </div>
      );
    },
  },
];
