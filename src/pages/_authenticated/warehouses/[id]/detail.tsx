import { Main } from "@/components/layout/main";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { DataTable } from "@/components/warehouses/detail/data-table/data-table";
import FormUpdateInfo from "@/components/warehouses/detail/form-update-info/form-update-info";
import NotifycationDetailWarehouse from "@/components/warehouses/notification-detail-warehouse";
import { useWarehouse } from "@/hooks/react-query-hooks/use-warehouse";
import { formatDate } from "@/utils/format-date";
import { useParams } from "react-router-dom";

const WarehouseDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data, isPending } = useWarehouse(id ?? 0);
  const warehouse = data?.warehouse;
  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Chi tiết lô hàng
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Trang hiển thị thông tin chi tiết lô hàng, Bạn có thể chỉnh sửa lại
            vị trí lưu kho của từng món đồ
          </p>
        </div>
        {!warehouse || isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <NotifycationDetailWarehouse warehouse={warehouse} />

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Mã lô:</p>
                    <p className="font-medium">{warehouse.SKU}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày nhập kho:</p>
                    <p className="font-medium">
                      {formatDate(warehouse.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Người gửi:</p>
                    <p className="font-medium">{warehouse.senderName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng số lượng item:</p>
                    <p className="font-medium">{warehouse.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vị trí:</p>
                    <p className="font-medium">{warehouse.stockPlace}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Người tạo:</p>
                    <p className="font-medium">{warehouse.receiverName}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Mô tả:</p>
                  <p className="text-sm mt-1">{warehouse.description}</p>
                </div>
                <span className="absolute top-[10px] right-[10px] ">
                  <FormUpdateInfo warehouse={warehouse} />
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between my-4">
                <h3 className="text-lg font-medium">
                  Danh sách sản phẩm trong lô
                </h3>
                <div className="flex items-center"></div>
              </div>
              <DataTable
                idWarehouse={data.warehouse.id}
                data={data.warehouse.itemWarehouses || []}
                isPending={isPending}
              />
            </div>
          </>
        )}
      </div>
    </Main>
  );
};

export default WarehouseDetailPage;
