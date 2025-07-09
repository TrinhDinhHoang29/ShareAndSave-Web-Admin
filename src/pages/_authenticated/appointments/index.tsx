import { DataTable } from "@/components/appointments/data-table/data-table";
import { exportToExcel } from "@/components/export-to-excel";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { useAppointments } from "@/hooks/react-query-hooks/use-appointment";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const ListAppointmentPage = () => {
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
  const { data, isPending, error } = useAppointments({
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
      data: data?.appointments || [],
      fileName: "ds_cuoc_hen",
    });
  }
  return (
    <Main>
      <div className="">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl dark:text-white font-bold text-gray-900">
              Danh sách các cuộc hẹn
            </h1>
            <p className="text-gray-500 mt-1  dark:text-white">
              Quản lí các cuộc hẹn để giao dịch đồ trong kho đồ cũ
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
          data={data?.appointments || []}
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

export default ListAppointmentPage;
