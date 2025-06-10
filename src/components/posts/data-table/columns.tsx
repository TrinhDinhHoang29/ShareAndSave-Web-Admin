import { PopupUpdatePost } from "@/components/posts/popup-update";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPost } from "@/types/post.type";
import { PostStatus, PostType } from "@/types/status.type";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Heart, Trash2 } from "lucide-react";

export const getColumns = (
  onInterest: (id: number) => void,
  onDelete: (id: string) => void,
  sorting: SortingState,
  handleDeleteInterest: (id: number) => void,
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>,
  setSelectedPost: (post: IPost) => void,
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<IPost>[] => [
  {
    accessorKey: "authorName",
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
      const post = row.original as IPost;
      return (
        <Button
          variant="link"
          className="p-0 text-left font-medium  hover:underline text-black dark:text-white"
          onClick={() => {
            setSelectedPost(post);
            setOpenSheet(true);
          }}
        >
          {post.authorName}
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "title",
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
          Tiêu đề
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
    accessorKey: "type",
    header: "Loại yêu cầu",
    cell: ({ row }) => {
      const typePost: PostType = row.getValue("type") as PostType;
      return typePost === PostType.FOUND_ITEM
        ? "Nhặt được đồ"
        : typePost === PostType.GIVE_AWAY_OLD_ITEM
        ? "Gửi lại đồ cũ"
        : typePost === PostType.SEEK_LOST_ITEM
        ? "Tìm kiếm đồ"
        : "Khác";
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
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value = row.getValue("status") as PostStatus;
      return value === PostStatus.APPROVED ? (
        <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
          Đã duyệt
        </Badge>
      ) : value === PostStatus.PENDING ? (
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
          Chờ duyệt
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
      const post = row.original as IPost;
      return (
        <div className="flex items-center gap-2">
          {post.isInterest ? (
            <Button
              variant={"outline"}
              onClick={() => handleDeleteInterest(post.id)}
            >
              <Heart className="text-red-500" />
            </Button>
          ) : (
            <Button variant={"outline"} onClick={() => onInterest(post.id)}>
              <Heart />
            </Button>
          )}

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
