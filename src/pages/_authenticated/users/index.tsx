import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/users/data-table/data-table";
import { useDeleteUser, useUsers } from "@/hooks/react-query-hooks/use-users";
import { Order } from "@/types/filter-api.type";
import { SortingState } from "@tanstack/react-table";
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
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      toast.success("Xóa người dùng thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Xóa người dùng thất bại");
    },
  });
  const handleDelete = async (id: string) => {
    const res = await ask("Bạn có chất xóa người dùng này không?");
    if (res) {
      deleteUserMutation.mutate(id);
    }
  };
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Danh sách người dùng
        </h1>
        <div className="flex items-center space-x-2"></div>
      </div>

      <DataTable
        handleDelete={handleDelete}
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
