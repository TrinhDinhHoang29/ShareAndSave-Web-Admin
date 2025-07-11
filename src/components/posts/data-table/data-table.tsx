import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { PlusCircle, Settings } from "lucide-react";
import React, { useState } from "react";

import LoadingSpinner from "@/components/loading-spinner";
import { getColumns } from "@/components/posts/data-table/columns";
import { FilterForm } from "@/components/posts/filter-form";
import SheetDetailPost from "@/components/posts/sheet-detail-post";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePost, useUpdatePost } from "@/hooks/react-query-hooks/use-post";
import { IPost } from "@/types/models/post.type";
import { PostStatus, PostType } from "@/types/status.type";
import { Link } from "react-router-dom";
import { useConfirm } from "use-confirm-hook";
import { UpdatePostDto } from "@/schemas/posts/update-post.schema";
import { toast } from "sonner";

interface DataTablePropsWithPage<TData> {
  data: TData[];
  totalPage: number;
  isPending: boolean;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  handleDelete: (id: number) => Promise<void>;
  handleInterest: (id: number) => Promise<void>;
  handleDeleteInterest: (id: number) => Promise<void>;
  pagination: { pageIndex: number; pageSize: number };
  setGlobalFilter: React.Dispatch<
    React.SetStateAction<{
      searchValue?: string;
      searchBy?: string;
      type?: PostType;
      status?: PostStatus;
    }>
  >;
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

export function DataTable<TData, TValue>({
  data,
  isPending,
  totalPage,
  pagination,
  sorting,
  handleDeleteInterest,
  setSorting, // 👈 Thêm prop này
  handleDelete,
  setGlobalFilter,
  handleInterest,
  setPagination,
}: DataTablePropsWithPage<TData>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openSheet, setOpenSheet] = useState(false);

  const postQuery = usePost(selectedPost?.id || 0);
  const { ask } = useConfirm();
  const postUpdateMutation = useUpdatePost({
    onSuccess: () => {
      toast.success("Chỉnh sửa bài viết thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const onUpdateFeature = async ({
    id,
    updatePostDto,
  }: {
    id: number;
    updatePostDto: UpdatePostDto;
  }) => {
    const res = await ask("Bạn có chắc sẽ lưu lại thay đổi này");
    if (res) {
      postUpdateMutation.mutate({ id, data: updatePostDto });
    }
  };
  const columns = getColumns(
    onUpdateFeature,
    handleInterest,
    handleDelete,
    sorting,
    handleDeleteInterest,

    setSorting,
    setSelectedPost,
    setOpenSheet
  );
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
    pageCount: totalPage + 1,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    state: {
      pagination,
      columnVisibility,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });
  return (
    <>
      <div>
        <FilterForm onFilter={setGlobalFilter} />
        <div className="my-4 grid grid-cols-7 gap-4">
          <div className="col-span-7 flex items-center space-x-2 md:col-span-2 md:col-start-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Ẩn / Hiện cột <Settings />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/posts/create">
              <Button variant={"outline"}>
                Thêm bài viết <PlusCircle />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Table className="rounded-lg border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mx-6 flex flex-wrap items-center justify-end gap-4 py-2">
            <div className="flex items-center gap-2">
              <span>Hiển thị</span>
              <Select
                value={pagination.pageSize.toString()} // 👈 Thêm dòng này
                onValueChange={(e) =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: 0, // reset về trang đầu khi đổi limit
                    pageSize: Number(e),
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn số dòng" defaultValue={10} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Số dòng</SelectLabel>
                    {[10, 20, 30, 50, 100].map((size) => (
                      <SelectItem value={size.toString()} key={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <span>dòng</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }
                disabled={pagination.pageIndex === 0}
              >
                Trang trước
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                disabled={pagination.pageIndex + 1 >= totalPage}
              >
                Trang sau
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SheetDetailPost
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        data={postQuery.data?.post || null}
      />
    </>
  );
}
