import FormCreateExportInvoice from "@/components/export-invoices/form-create-export-invoice";
import NotifycationExport from "@/components/export-invoices/notification-export";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { WarehouseItemStatus } from "@/types/status.type";
import { IconPackageExport } from "@tabler/icons-react";
import React from "react";

export interface PopupCreateExportInvoiceProps {
  itemWarehouses: IItemWarehouse[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const formatStatus = (status: WarehouseItemStatus) => {
  return status === WarehouseItemStatus.INSTOCK ? (
    <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
      Đang lưu kho
    </Badge>
  ) : (
    <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
      Đã xuất kho
    </Badge>
  );
};
const PopupCreateExportInvoice = ({
  open,
  setOpen,
  itemWarehouses,
}: PopupCreateExportInvoiceProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Xuất kho <IconPackageExport />
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin phiêu xuất</DialogTitle>
          {/* <DialogDescription>Chọn các sản phẩm từ kho</DialogDescription> */}
        </DialogHeader>
        <NotifycationExport />
        <FormCreateExportInvoice />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Danh sách món đồ</h3>
        </div>
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mã sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên sản phẩm
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tình trạng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Loại sản phẩm
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itemWarehouses.map((item) => (
                  <tr key={item.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.itemName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatStatus(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {item.categoryName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PopupCreateExportInvoice;
