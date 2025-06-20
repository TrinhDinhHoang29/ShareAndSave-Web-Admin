import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PopDisplayQR from "@/components/warehouses/popup-display-qr";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { WarehouseItemStatus } from "@/types/status.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen } from "lucide-react";
const formatStatus = (status: WarehouseItemStatus) => {
  return status === WarehouseItemStatus.INSTOCK ? (
    <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
      Đang lưu kho
    </Badge>
  ) : (
    <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
      Đã xuất kho
    </Badge>
  );
};
export const getColumns = (
  setSelectedWarehouse: (itemWarehouse: IItemWarehouse) => void,
  setOpen: (open: boolean) => void
): ColumnDef<IItemWarehouse>[] => [
  {
    accessorKey: "code",
    header: "Mã món đồ",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      return (
        <span className="font-medium text-blue-500">{warehouse.code}</span>
      );
    },
  },
  {
    accessorKey: "itemName",
    header: "Tên món đồ",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      return formatStatus(warehouse.status);
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              setSelectedWarehouse(warehouse);
              setOpen(true);
            }}
          >
            Xem mô tả
            <Eye />
          </Button>
          <PopDisplayQR value={warehouse.code} />
        </div>
      );
    },
  },
];
