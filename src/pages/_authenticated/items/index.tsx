import { DataTable } from "@/components/items/data-table/data-table";
import { Main } from "@/components/layout/main";
import { useDeleteItem, useItems } from "@/hooks/react-query-hooks/use-item";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const ListItemPage = () => {
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
  const { data, isPending, error } = useItems({
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
  const deleteUserMutation = useDeleteItem({
    onSuccess: () => {
      toast.success("Xóa món đồ thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Xóa món đồ thất bại");
    },
  });
  const handleDelete = async (id: string) => {
    const res = await ask("Bạn có chất xóa món đồ của hệ thống?");
    if (res) {
      deleteUserMutation.mutate(Number(id));
    }
  };
  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Danh sách đồ đạc
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Quản lý tất cả đồ đạc của hệ thống
          </p>
        </div>

        <DataTable
          handleDelete={handleDelete}
          sorting={sorting} // 👈 THÊM
          setSorting={setSorting} // 👈 THÊM
          data={data?.items!}
          totalPage={data?.totalPage!}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
          isPending={isPending}
        />
      </div>
    </Main>
  );
};

export default ListItemPage;
