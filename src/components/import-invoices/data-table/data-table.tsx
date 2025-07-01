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

import { getColumns } from "@/components/import-invoices/data-table/columns";
import LoadingSpinner from "@/components/loading-spinner";
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
import { IImportInvoice } from "@/types/models/import-invoice.type";
import { PostStatus, PostType } from "@/types/status.type";
import { Link } from "react-router-dom";
import { FilterForm } from "@/components/import-invoices/filter-form";

interface DataTablePropsWithPage<TData> {
  data: TData[];
  totalPage: number;
  isPending: boolean;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  handleDelete: (id: string) => Promise<void>;
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
  setSorting, // 👈 Thêm prop này
  handleDelete,
  setGlobalFilter,
  setPagination,
}: DataTablePropsWithPage<TData>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [_selectedImportInvoice, setSelectedImportInvoice] =
    useState<IImportInvoice | null>(null);
  const [_openSheet, setOpenSheet] = useState(false);
  // const postQuery = usePost(selectedUser?.id || 0);

  const columns = getColumns(
    handleDelete,
    sorting,
    setSorting,
    setSelectedImportInvoice,
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
            <Link to="/import-invoices/create">
              <Button variant={"outline"}>
                Thêm phiếu nhập <PlusCircle />
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
            <div className="hidden sm:flex items-center gap-2">
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
                Previous
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <SheetDetailPost
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        data={postQuery.data?.post || null}
      /> */}
    </>
  );
}
