import PopupShowDescription from "@/components/inventories/popup-show-des";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PopDisplayQR from "@/components/warehouses/popup-display-qr";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { ITransaction } from "@/types/models/transaction.type";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";

export const getColumns = (
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  selectedItemWarehouses: IItemWarehouse[],
  setSelectedItemWarehouses: (itemWarehouse: IItemWarehouse[]) => void
): ColumnDef<IItemWarehouse>[] => [
  {
    accessorKey: "checkbox",
    header: "",
    cell: ({ row }) => {
      const item = row.original;
      const isChecked = selectedItemWarehouses.some(
        (selected) => selected.id === item.id
      );

      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => {
            if (checked) {
              // Add item nếu chưa có
              if (!isChecked) {
                setSelectedItemWarehouses([...selectedItemWarehouses, item]);
              }
            } else {
              // Remove item nếu đã có
              setSelectedItemWarehouses(
                selectedItemWarehouses.filter((i) => i.id !== item.id)
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
    id: "qr",
    header: "Mã QR",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      console.log(warehouse.code);
      return (
        <div className="flex items-center gap-2">
          <PopDisplayQR value={warehouse.code} />
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Mã món đồ",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      return <span className="font-medium">{warehouse.code}</span>;
    },
  },
  {
    accessorKey: "itemName",
    header: "Tên món đồ",
  },
  {
    accessorKey: "categoryName",
    header: "Loại món đồ",
    cell: ({ row }) => {
      const category = row.getValue("categoryName") as string;
      return <Badge variant="outline">{category}</Badge>;
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
      return `${date.getHours()}h${date.getMinutes()}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Mô tả",
    cell: ({ row }: any) => {
      const warehouse = row.original as IItemWarehouse;
      return <PopupShowDescription description={warehouse.description} />;
    },
  },
];
