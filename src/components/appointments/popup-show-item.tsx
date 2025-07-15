import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAppointment } from "@/types/models/appointment.type";
import { Eye, Package2 } from "lucide-react";

const PopupShowItemAppointment = ({
  appointment,
}: {
  appointment: IAppointment;
}) => {
  const totalQuantity =
    appointment.appointmentItems.length > 0
      ? appointment.appointmentItems.reduce(
          (pre, arr) => arr.actualQuantity + pre,
          0
        )
      : 0;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <div className="flex gap-x-2 items-center">
            <Eye className="w-4 h-4" />
            <span>{totalQuantity || 0} món</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-x-2 items-center">
              <Package2 className="w-4 h-4" />
              <span>Danh sách món đồ </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Đây là toàn bộ món đồ của cuộc hẹn
          </DialogDescription>
        </DialogHeader>
        {appointment.appointmentItems?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg relative shadow-lg border border-gray-200 m-8 mb-1"
          >
            <div className="p-2 pb-0">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={item.itemImage}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {item.itemName}
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="mb-1">Danh mục: {item.categoryName}</div>
                    <div className="flex items-center gap-x-4">
                      <Badge variant={"outline"}>
                        Số lượng thực tế: {item.actualQuantity}
                      </Badge>
                      {item.missingQuantity > 0 && (
                        <span className="text-red-500">
                          Thiếu: {item.missingQuantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {(!appointment.appointmentItems ||
          appointment.appointmentItems.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            Không có món đồ nào trong cuộc hẹn này
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupShowItemAppointment;
