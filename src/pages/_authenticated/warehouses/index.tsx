import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/warehouses/data-table/data-table";
import { StatusSummary } from "@/components/warehouses/status-summary";
import { useWarehouses } from "@/hooks/react-query-hooks/use-warehouse";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const ListWarehousesPage = () => {
  const { ask } = useConfirm();
  const [globalFilter, setGlobalFilter] = useState<{
    searchValue?: string;
    searchBy?: string;
  }>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });
  const { data, isPending, error } = useWarehouses({
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
            Danh sách lô hàng
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Quản lý tất cả lô hàng của hệ thống, bạn có thể thêm, sửa, xóa lô
            hàng trên tại giao diện này
          </p>
        </div>
        <StatusSummary />

        <DataTable
          sorting={sorting} // 👈 THÊM
          setSorting={setSorting} // 👈 THÊM
          data={data?.warehouses || []}
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

export default ListWarehousesPage;
