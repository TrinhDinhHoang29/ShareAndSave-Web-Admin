import { AlertCircleIcon } from "lucide-react";

const NotifycationExport = () => {
  return (
    <div className="">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
        <div className="mr-3 mt-0.5">
          <AlertCircleIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-800">Thông tin lô hàng</h3>
          <p className="mt-1 text-sm text-blue-700">
            Bạn đang tạo phiếu xuất kho, vui lòng kiểm tra lại thông tin lô
            hàng. Để phòng tránh những sai sót không đáng có.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotifycationExport;
