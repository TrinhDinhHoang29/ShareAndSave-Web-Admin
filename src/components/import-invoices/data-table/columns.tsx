import { PopupUpdatePost } from "@/components/posts/popup-update";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IImportInvoice } from "@/types/import-invoice.type";
import { IPost } from "@/types/post.type";
import { ClassifyImportInvoice, PostStatus } from "@/types/status.type";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
  sorting: SortingState,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedImportInvoice: (importInvoice: IImportInvoice) => void,
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<IImportInvoice>[] => [
  {
    accessorKey: "receiverName",
    header: "Tên người nhận",
    cell: ({ row }) => {
      const importInvoice = row.original as IImportInvoice;
      return (
        <Button
          variant="link"
          className="p-0 text-left font-medium  hover:underline text-black dark:text-white"
          onClick={() => {
            setSelectedImportInvoice(importInvoice);
            setOpenSheet(true);
          }}
        >
          {importInvoice.receiverName}
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
    accessorKey: "itemCount",
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
      const typePost = row.getValue("itemCount");
      return `${typePost} món`;
    },
  },
  {
    accessorKey: "classify",
    header: "Loại phiếu nhập",
    cell: ({ row }) => {
      const typePost = row.getValue("classify");
      return typePost === ClassifyImportInvoice.ALL ? (
        <Badge variant="outline">Tất cả</Badge>
      ) : typePost === ClassifyImportInvoice.LOSE_ITEM ? (
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
    id: "actions",
    header: "Hành động",
    cell: ({ row }: any) => {
      const post = row.original as IPost;
      return (
        <div className="flex items-center gap-2">
          {post.status === PostStatus.PENDING && (
            <PopupUpdatePost post={post} />
          )}
          <Button
            variant={"outline"}
            onClick={() => onDelete(post.id.toString())}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
