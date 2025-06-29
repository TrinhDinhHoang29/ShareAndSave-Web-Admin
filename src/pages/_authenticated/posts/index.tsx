import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/posts/data-table/data-table";
import { StatusSummary } from "@/components/posts/status-summary";
import {
  useCreateInterest,
  useDeleteInterest,
} from "@/hooks/react-query-hooks/use-interest";
import { useDeletePost, usePosts } from "@/hooks/react-query-hooks/use-post";
import { useDeleteUser } from "@/hooks/react-query-hooks/use-users";
import { Order } from "@/types/filter-api.type";
import { PostOf, PostStatus, PostType } from "@/types/status.type";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const ListPostPage = () => {
  const { ask } = useConfirm();
  const [globalFilter, setGlobalFilter] = useState<{
    searchValue?: string;
    searchBy?: string;
    type?: PostType;
    status?: PostStatus;
  }>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const createInterestMutation = useCreateInterest({
    onSuccess: () => {
      toast.success("Quan tâm bài viết thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Lỗi hệ thống");
    },
  });
  const deleteInterestMutation = useDeleteInterest({
    onSuccess: () => {
      toast.success("Hủy quan tâm bài viết thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Lỗi hệ thống");
    },
  });
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });
  const { data, isPending, error } = usePosts({
    postOf: PostOf.CLIENT,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sort: sorting[0]?.id,
    order: sorting[0]?.desc ? Order.DESC : Order.ASC,
    searchBy: globalFilter.searchBy,
    searchValue: globalFilter.searchValue,
    type: globalFilter.type,
    status: globalFilter.status,
  });
  console.log(data);
  if (error) {
    toast.error(error?.message || "Lỗi");
  }
  const deleteUserMutation = useDeletePost({
    onSuccess: () => {
      toast.success("Xóa bài viết thành công");
    },
    onError: (err) => {
      toast.error(err?.message || "Xóa bài viết thất bại");
    },
  });
  const handleInterest = async (id: number) => {
    const res = await ask("Bạn có chất muốn quan tâm bài viết này không?");
    if (res) {
      createInterestMutation.mutate(id);
    }
  };
  const handleDeleteInterest = async (id: number) => {
    const res = await ask("Bạn có chất muốn hủy quan tâm bài viết này không ?");
    if (res) {
      deleteInterestMutation.mutate(id);
    }
  };
  const handleDelete = async (id: number) => {
    deleteUserMutation.mutate(id);
  };
  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Danh sách bài viết
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Quản lý tất cả bài đăng về đồ thất lạc và tìm thấy
          </p>
        </div>
        <StatusSummary />

        <DataTable
          handleDeleteInterest={handleDeleteInterest}
          handleInterest={handleInterest}
          handleDelete={handleDelete}
          sorting={sorting} // 👈 THÊM
          setSorting={setSorting} // 👈 THÊM
          data={data?.posts || []}
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

export default ListPostPage;
