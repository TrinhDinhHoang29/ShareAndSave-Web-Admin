import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { IWarehouse } from "@/types/models/warehouse.type";
import { WarehouseItemStatus } from "@/types/status.type";
import { formatDate } from "@/utils/format-date";
import { ClipboardIcon, InfoIcon } from "lucide-react";
import React from "react";

export interface PopupWarehouseDetailProps {
  warehouse?: IWarehouse;
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
const PopupWarehouseDetail = ({
  open,
  setOpen,
  warehouse,
}: PopupWarehouseDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" sm:max-w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin chi tiết lô hàng</DialogTitle>
          {/* <DialogDescription>Chọn các sản phẩm từ kho</DialogDescription> */}
        </DialogHeader>
        {!warehouse ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Mã lô:</p>
                    <p className="font-medium">{warehouse.sku}</p>
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
                    <p className="font-medium">{warehouse.reciverName}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Mô tả:</p>
                  <p className="text-sm mt-1">{warehouse.description}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  Danh sách sản phẩm trong lô
                </h3>
                <div className="flex items-center">
                  <Button className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <ClipboardIcon className="h-4 w-4 mr-1" />
                    Xuất Excel
                  </Button>
                </div>
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
                      {warehouse.itemWarehouses.map((item) => (
                        <tr key={item.code} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {item.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.nameItem}
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default PopupWarehouseDetail;
// export default PopupWarehouseDetail;
// import React from 'react'
// import Modal from '../ui/Modal'
// import StatusBadge from '../ui/StatusBadge'
// import { InfoIcon, ClipboardIcon } from 'lucide-react'
// type BatchDetailsModalProps = {
//   batchId: string
//   isOpen: boolean
//   onClose: () => void
// }
// Mock data
// const batchItems = [
//   {
//     id: 'ITEM-001',
//     name: 'Áo thun nam cotton',
//     quantity: 50,
//     status: 'Đang lưu kho' as const,
//     location: 'A-12-3',
//   },
//   {
//     id: 'ITEM-002',
//     name: 'Quần jeans nữ',
//     quantity: 30,
//     status: 'Đang lưu kho' as const,
//     location: 'B-05-1',
//   },
//   {
//     id: 'ITEM-003',
//     name: 'Áo sơ mi nam',
//     quantity: 25,
//     status: 'Đang lưu kho' as const,
//     location: 'A-10-2',
//   },
//   {
//     id: 'ITEM-004',
//     name: 'Váy nữ dáng xòe',
//     quantity: 15,
//     status: 'Chờ kiểm tra' as const,
//     location: 'C-03-4',
//   },
//   {
//     id: 'ITEM-005',
//     name: 'Áo khoác dù unisex',
//     quantity: 20,
//     status: 'Đang lưu kho' as const,
//     location: 'B-08-2',
//   },
//   {
//     id: 'ITEM-006',
//     name: 'Quần short nam',
//     quantity: 16,
//     status: 'Đang lưu kho' as const,
//     location: 'A-15-1',
//   },
// ]
// const batchInfo = {
//   id: 'BTC-001',
//   date: '15/10/2023',
//   supplier: 'Công ty TNHH ABC',
//   itemCount: 156,
//   status: 'Đang lưu kho' as const,
//   createdBy: 'Nguyễn Văn A',
//   notes: 'Lô hàng nhập từ nhà cung cấp ABC, đã kiểm tra đủ số lượng.',
// }
// const BatchDetailsModal: React.FC<BatchDetailsModalProps> = ({
//   batchId,
//   isOpen,
//   onClose,
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={`Chi tiết lô hàng: ${batchId}`}
//       size="xl"
//     >
//       <div className="space-y-6">
//         <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Mã lô:</p>
//               <p className="font-medium">{batchInfo.id}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Ngày nhập kho:</p>
//               <p className="font-medium">{batchInfo.date}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Nhà cung cấp:</p>
//               <p className="font-medium">{batchInfo.supplier}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Tổng số lượng item:</p>
//               <p className="font-medium">{batchInfo.itemCount}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Trạng thái:</p>
//               <StatusBadge status={batchInfo.status} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Người tạo:</p>
//               <p className="font-medium">{batchInfo.createdBy}</p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-gray-500">Ghi chú:</p>
//             <p className="text-sm mt-1">{batchInfo.notes}</p>
//           </div>
//         </div>
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium">Danh sách sản phẩm trong lô</h3>
//             <div className="flex items-center">
//               <div className="relative mr-2">
//                 <input
//                   type="text"
//                   className="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
//                   placeholder="Tìm kiếm sản phẩm..."
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
//                   <InfoIcon className="h-4 w-4 text-gray-400" />
//                 </div>
//               </div>
//               <button className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
//                 <ClipboardIcon className="h-4 w-4 mr-1" />
//                 Xuất Excel
//               </button>
//             </div>
//           </div>
//           <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Mã sản phẩm
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Tên sản phẩm
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Số lượng
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Tình trạng
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Vị trí trong kho
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {batchItems.map((item) => (
//                     <tr key={item.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                         {item.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {item.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {item.quantity}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <StatusBadge status={item.status} />
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
//                           {item.location}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   )
// }
// export default BatchDetailsModal
