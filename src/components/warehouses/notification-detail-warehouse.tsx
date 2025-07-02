import { IWarehouse } from "@/types/models/warehouse.type";
import { AlertCircleIcon } from "lucide-react";

export interface NotifycationDetailWarehouseProps {
  warehouse: IWarehouse;
}
const NotifycationDetailWarehouse = ({
  warehouse,
}: NotifycationDetailWarehouseProps) => {
  const descriptions = warehouse.itemWarehouses.map(
    (item) => !item.description && item.code
  );
  return (
    <div className="my-3">
      <div className="bg-orange-50 border border-orange-200 rounded-md p-4 flex gap-x-4">
        <div className="">
          <AlertCircleIcon className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-orange-800">Cảnh báo</h3>
          {(!warehouse.description || !warehouse.stockPlace) && (
            <div className="mt-1 text-sm text-orange-700">
              Mô tả hoặc vị trí của lô hàng này chưa được thêm , hãy thêm ngay
              để tránh sai sót không đáng có
            </div>
          )}
          <div className="mt-1 text-sm text-orange-700">
            {descriptions.length > 0 && (
              <div className="text-justify">
                Mô tả của sản phẩm có mã code{" "}
                {descriptions.map((item, index) =>
                  index === 0 ? `${item}` : `, ${item}`
                )}{" "}
                chưa có
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifycationDetailWarehouse;
