import { getReportGoodDeed } from "@/apis/good-deed.api";
import { ExcelHeader, exportToExcelHeader } from "@/components/export-to-excel";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/users/data-table/data-table";
import { useUsers } from "@/hooks/react-query-hooks/use-users";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const UsersPage = () => {
  const { ask } = useConfirm();
  const [globalFilter, setGlobalFilter] = useState<{
    searchValue: string;
    searchBy: string;
  }>({ searchValue: "", searchBy: "" });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });
  const { data, isPending, error } = useUsers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sort: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? Order.DESC : Order.ASC,
    searchBy: globalFilter.searchBy,
    searchValue: globalFilter.searchValue,
  });
  console.log(data);
  if (error) {
    toast.error(error?.message || "Lỗi");
  }

  async function handleExportExcel() {
    const res = await ask("Bạn có chắc muốn xuất file ?");
    if (!res) return;

    const data = await getReportGoodDeed();
    const convertData = data.data.userReports.map((item) => {
      return {
        ...item,
        totalGoodDeed: item.goodDeeds.reduce(
          (pre, cur) => pre + cur.goodDeedCount,
          0
        ),
      };
    });
    const headers = [
      { label: "Mã người dùng", key: "id" },
      { label: "Họ và tên", key: "fullName" },
      { label: "Chuyên ngành", key: "major" },
      { label: "Điểm tốt", key: "goodPoint" },
      { label: "Tổng việc tốt", key: "totalGoodDeed" },
    ] as ExcelHeader<{
      totalGoodDeed: number;
      id: number;
      fullName: string;
      major: string;
      goodPoint: number;
      goodDeeds: {
        goodDeedType: number;
        goodDeedCount: number;
      }[];
    }>[];
    await exportToExcelHeader(convertData, headers, "Báo cáo việc tốt.xlsx");
  }
  return (
    <Main>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Danh sách người dùng
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Quản lý người dùng của hệ thống, có thể chỉnh sửa thông tin người
            dùng
          </p>
        </div>
        <div>
          <Button onClick={handleExportExcel}>
            Xuất excel
            <Download />
          </Button>
        </div>
      </div>

      <DataTable
        sorting={sorting} // 👈 THÊM
        setSorting={setSorting} // 👈 THÊM
        data={data?.clients!}
        totalPage={data?.totalPage!}
        setGlobalFilter={setGlobalFilter}
        pagination={pagination}
        setPagination={setPagination}
        isPending={isPending}
      />
    </Main>
  );
};

export default UsersPage;
