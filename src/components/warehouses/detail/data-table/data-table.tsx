import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Settings } from "lucide-react";
import React, { useState } from "react";

import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getColumns } from "@/components/warehouses/detail/data-table/columns";
import FormUpdateDescription from "@/components/warehouses/detail/form-update-description/form-update-description";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";

interface DataTablePropsWithPage<TData> {
  idWarehouse: number;
  data: TData[];
  isPending: boolean;
}

export function DataTable<TData, TValue>({
  idWarehouse,
  data,
  isPending,
}: DataTablePropsWithPage<TData>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [selectedItemWarehouse, setSelectedItemWarehouse] =
    useState<IItemWarehouse | null>(null);
  const [open, setOpen] = useState(false);
  const columns = getColumns(setSelectedItemWarehouse, setOpen);
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });
  console.log(selectedItemWarehouse);
  return (
    <>
      <div>
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
        </div>
      </div>
      {selectedItemWarehouse && (
        <FormUpdateDescription
          itemWarehouse={selectedItemWarehouse}
          idWarehouse={idWarehouse}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
