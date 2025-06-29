import PopupShowGoodDeed from "@/components/good-deeds/popup-show-good-deed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PopupUpdateUser } from "@/components/users/popup-update";
import { IUser } from "@/types/models/user.type";
import { formatDate } from "@/utils/format-date";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedUser: (user: IUser) => void,
  setOpenSheet: (open: boolean) => void
): ColumnDef<IUser>[] => [
  {
    accessorKey: "fullName",
    header: "Họ và tên",
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
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "major",
    header: "Chuyên ngành",
  },
  {
    accessorKey: "goodPoint",
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
          Điểm tốt
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
      return <PopupShowGoodDeed user={user} />;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "createdAt",
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
          Ngày tạo
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return formatDate(value);
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value = row.getValue("status") as number;
      return value === 1 ? (
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          Đang hoạt động
        </Badge>
      ) : (
        <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
          Dừng hoạt động
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
          <Button variant="outline" onClick={() => onDelete(id)}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
