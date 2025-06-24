import PopupShowItemTransaction from "@/components/transactions/popup-show-item";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFilterTransaction } from "@/types/filter-api.type";
import { ITransaction } from "@/types/models/transaction.type";
import { DeliveryMethod, TransactionStatus } from "@/types/status.type";
import { IconReload } from "@tabler/icons-react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Ban,
  CheckCircle2,
  Eye,
  Truck,
  Users,
} from "lucide-react";

export const getColumns = (
  globalFilter: IFilterTransaction,
  onFilter: React.Dispatch<React.SetStateAction<IFilterTransaction>>,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
): ColumnDef<ITransaction>[] => [
  {
    accessorKey: "receiverName",
    header: "Tên người nhận",
    cell: ({ row }) => {
      const transaction = row.original as ITransaction;
      return (
        <div className="p-0 text-left font-medium  text-black dark:text-white">
          {transaction.receiverName}
        </div>
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
    accessorKey: "method",
    header: "Phương pháp",
    cell: ({ row }) => {
      const transaction = row.original as ITransaction;
      return (
        <div className="flex gap-x-2 items-center">
          <span>
            {transaction.method == DeliveryMethod.DELIVERY ? (
              <Truck className="w-4 h-4 text-gray-600" />
            ) : (
              <Users className="w-4 h-4 text-gray-600" />
            )}
          </span>
          <span className="text-gray-600"> {transaction.method}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "itemCount",
    header: "Tổng món đồ",
    cell: ({ row }) => {
      const transaction = row.original as ITransaction;
      return <PopupShowItemTransaction transaction={transaction} />;
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <Select
        value={globalFilter?.status?.toString() ?? "ALL"}
        onValueChange={(value) => {
          onFilter((prev) => ({
            ...prev,
            status:
              value === "ALL"
                ? undefined
                : (Number(value) as TransactionStatus),
          }));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ALL">Trạng thái</SelectItem>
            <SelectItem value={TransactionStatus.SUCCESS.toString()}>
              Đã hoàn thành
            </SelectItem>
            <SelectItem value={TransactionStatus.PENDING.toString()}>
              Đang xử lý
            </SelectItem>
            <SelectItem value={TransactionStatus.CANCELLED.toString()}>
              Đã hủy
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as TransactionStatus;
      return (
        <div className="flex items-center gap-1 flex-shrink-0">
          {status === TransactionStatus.CANCELLED ? (
            <>
              <span className="text-xs flex gap-2 items-center text-red-500 font-semibold px-3 py-1 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-100">
                <Ban className="w-4 h-4  text-red-500 " />
                Đã hủy
              </span>
            </>
          ) : status === TransactionStatus.PENDING ? (
            <>
              <span className="flex gap-2 items-center text-xs text-yellow-500 font-semibold px-3 py-1 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full border border-yellow-100">
                <IconReload className="w-4 h-4 text-yellow-500 " />
                Đang chờ
              </span>
            </>
          ) : (
            <span className="text-xs text-green-500 flex gap-2 items-center font-semibold px-3 py-1 bg-gradient-to-r from-green-50 to-green-100 rounded-full border border-green-100">
              <CheckCircle2 className="w-4 h-4  text-green-500 " />
              Đã hoàn thành
            </span>
          )}
        </div>
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
      return `${date.getHours()}h${date.getMinutes()}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
    enableSorting: true,
  },
];
