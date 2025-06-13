import { PopupUpdateItem } from "@/components/items/popup-update-item";
import { Button } from "@/components/ui/button";
import { PopupUpdateUser } from "@/components/users/popup-update";
import { IItem } from "@/types/models/item.type";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedUser: (user: IItem) => void,
  setOpenSheet: (open: boolean) => void
): ColumnDef<IItem>[] => [
  {
    accessorKey: "name",
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
          Tên đồ đạc
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as IItem;
      return (
        <Button
          variant="link"
          className="p-0 text-left font-medium  hover:underline text-black dark:text-white"
          onClick={() => {
            setSelectedUser(item);
            setOpenSheet(true);
          }}
        >
          {item.name}
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "categoryName",
    header: "Danh mục",
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
          Thời gian
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return `${date.getHours()}h${date.getMinutes()}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const id: string = row.original.id;
      const item = row.original as IItem;
      return (
        <div className="flex items-center gap-2">
          <PopupUpdateItem item={item} />
          <Button variant="outline" onClick={() => onDelete(id)}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
