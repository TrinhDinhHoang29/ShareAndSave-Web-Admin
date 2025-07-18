import { DataTable } from "@/components/import-invoices/data-table/data-table";
import { Main } from "@/components/layout/main";
import { useImportInvoices } from "@/hooks/react-query-hooks/use-import-invoice";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

const ListImportInvoice = () => {
  const [globalFilter, setGlobalFilter] = useState<{
    searchValue?: string;
    searchBy?: string;
  }>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });
  const { data, isPending, error } = useImportInvoices({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sort: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? Order.DESC : Order.ASC,
    searchBy: globalFilter.searchBy,
    searchValue: globalFilter.searchValue,
  });
  if (error) {
    toast.error(error?.message || "Lỗi");
  }

  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Danh sách phiếu nhập
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Quản lý tất cả phiếu nhập của hệ thống
          </p>
        </div>
        {/* <StatusSummary /> */}

        <DataTable
          sorting={sorting} // 👈 THÊM
          setSorting={setSorting} // 👈 THÊM
          data={data?.importInvoices || []}
          totalPage={Math.ceil(data?.totalPage!)}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
          isPending={isPending}
        />
      </div>
    </Main>
  );
};

export default ListImportInvoice;
