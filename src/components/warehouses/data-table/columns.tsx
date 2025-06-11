import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IWarehouse } from "@/types/models/warehouse.type";
import { ClassifyImportInvoice } from "@/types/status.type";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedWarehouse: (warehouse: IWarehouse) => void,
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<IWarehouse>[] => [
  {
    accessorKey: "sku",
    header: "Mã lô hàng",
    cell: ({ row }) => {
      const warehouse = row.original as IWarehouse;
      return (
        <Button
          variant="link"
          className="p-0 text-left font-medium  hover:underline text-black dark:text-white"
          onClick={() => {
            setSelectedWarehouse(warehouse);
            setOpenSheet(true);
          }}
        >
          {warehouse.sku}
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "senderName",
    header: "Tên người gửi",
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
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
          Tống món đồ
          <ArrowUpDown
            className={`ml-2 h-4 w-4 ${
              isSorted ? (isSorted.desc ? "rotate-180" : "") : "opacity-50"
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const typePost = row.getValue("quantity");
      return `${typePost} món`;
    },
  },
  {
    accessorKey: "classify",
    header: "Loại lô hàng",
    cell: ({ row }) => {
      const typePost = row.getValue("classify");
      return typePost == ClassifyImportInvoice.ALL ? (
        <Badge variant="outline">Tất cả</Badge>
      ) : typePost == ClassifyImportInvoice.LOSE_ITEM ? (
        <Badge variant="outline">Đồ thất lạc</Badge>
      ) : (
        <Badge variant="outline">Đồ cũ</Badge>
      );
    },
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
      return `${date.getHours()}h${date.getMinutes()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
    enableSorting: true,
  },
  {
    accessorKey: "stockPlace",
    header: "Vị trí lưu kho",
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const warehouse = row.original as IWarehouse;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => onDelete(warehouse.id.toString())}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
