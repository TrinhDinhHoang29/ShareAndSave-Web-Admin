import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Search, Settings, X } from "lucide-react";
import React, { useState } from "react";

import { getColumns } from "@/components/items/data-table/columns";
import { PopupCreateNewItem } from "@/components/items/popup-create-new-item";
import SheetDetailItem from "@/components/items/sheet-item-post";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { IItem } from "@/types/models/item.type";

interface DataTablePropsWithPage<TData> {
  data: TData[];
  totalPage: number;
  isPending: boolean;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  handleDelete: (id: string) => Promise<void>;
  pagination: { pageIndex: number; pageSize: number };
  setGlobalFilter: React.Dispatch<
    React.SetStateAction<{ searchValue: string; searchBy: string }>
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
  const [searchInput, setSearchInput] = React.useState("");
  const [searchBy, setSearchBy] = useState<string>("");

  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

  const [openSheet, setOpenSheet] = useState(false);

  const columns = getColumns(
    handleDelete,
    sorting,
    setSorting,
    setSelectedItem,
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
        <div className="my-4 grid grid-cols-7 gap-4">
          <div className="col-span-7 flex items-center gap-x-2 md:col-span-4">
            <Select
              onValueChange={(value) => setSearchBy(value)}
              value={searchBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn trường" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tìm kiếm theo</SelectLabel>
                  <SelectItem value="name">Tên món đồ</SelectItem>
                  <SelectItem value="categoryName">Loại món đồ</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input
                className="w-full flex-1"
                placeholder="Tìm kiếm theo tên chiến dịch..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
            <Button
              disabled={searchBy && searchInput ? false : true}
              onClick={() =>
                setGlobalFilter({
                  searchValue: searchInput,
                  searchBy: searchBy,
                })
              }
            >
              <Search />
            </Button>
            {(searchBy || searchInput) && (
              <Button
                variant={"destructive"}
                onClick={() => {
                  setSearchInput("");
                  setSearchBy("");
                  setGlobalFilter({
                    searchValue: "",
                    searchBy: "",
                  });
                }}
              >
                <X />
              </Button>
            )}
          </div>
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
            <PopupCreateNewItem />
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
            <div className="sm:flex hidden items-center gap-2">
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
                  <SelectValue placeholder="Select a fruit" defaultValue={10} />
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
      <SheetDetailItem
        data={selectedItem}
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
      />
    </>
  );
}
