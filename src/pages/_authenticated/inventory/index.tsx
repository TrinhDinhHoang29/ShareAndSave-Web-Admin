import { exportToExcel } from "@/components/export-to-excel";
import { DataTable } from "@/components/inventories/data-table/data-table";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { useItemWarehouses } from "@/hooks/react-query-hooks/use-item-warehouses";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { Download, Hand } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const ListInventoriesPage = () => {
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
  const { data, isPending, error } = useItemWarehouses({
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
  async function handleExportExcel() {
    const res = await ask("Bạn có chắc muốn xuất file ?");
    if (!res) return;
    exportToExcel({
      data: data?.itemWarehouses || [],
      fileName: "User_List",
    });
  }
  return (
    <Main>
      <div className="">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl dark:text-white font-bold text-gray-900">
              Danh sách hàng tồn kho
            </h1>
            <p className="text-gray-500 mt-1  dark:text-white">
              Quản lý tồn kho của hệ thống, có thể xuất hàng tại đây
            </p>
          </div>
          <div>
            <Button onClick={handleExportExcel}>
              Xuất excel <Download />
            </Button>
          </div>
        </div>

        <DataTable
          sorting={sorting} // 👈 THÊM
          setSorting={setSorting} // 👈 THÊM
          data={data?.itemWarehouses || []}
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

export default ListInventoriesPage;
