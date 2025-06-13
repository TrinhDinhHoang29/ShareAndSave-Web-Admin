import { IWarehouse } from "@/types/models/warehouse.type";
import { AlertCircleIcon } from "lucide-react";

export interface NotifycationDetailWarehouseProps {
  warehouse: IWarehouse;
}
const NotifycationDetailWarehouse = ({
  warehouse,
}: NotifycationDetailWarehouseProps) => {
  return (
    <div className="my-3">
      {(!warehouse.description || !warehouse.stockPlace) && (
        <div className="bg-orange-50 border border-orange-200 rounded-md p-4 flex items-start">
          <div className="mr-3 mt-0.5">
            <AlertCircleIcon className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-orange-800">Cảnh báo</h3>
            <div className="mt-1 text-sm text-orange-700">
              Mô tả hoặc vị trí của lô hàng này chưa được thêm , hãy thêm ngay
              để tránh sai sót không đáng có
            </div>
            <div className="mt-1 text-sm text-orange-700">
              {warehouse.itemWarehouses.map((item) => (
                <p>
                  {!item.description &&
                    `Mô tả của sản phẩm có mã code ${item.code} chưa có`}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotifycationDetailWarehouse;
