import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormTextarea from "@/components/ui/textarea-form";
import { useUpdateWarehouse } from "@/hooks/react-query-hooks/use-warehouse";
import {
  UpdateWarehouseDto,
  UpdateWarehouseSchema,
} from "@/schemas/warehouses/update-warehouse";
import { IWarehouse } from "@/types/models/warehouse.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export interface FormUpdateInfoProps {
  warehouse: IWarehouse;
}
const FormUpdateInfo = ({ warehouse }: FormUpdateInfoProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<UpdateWarehouseDto>({
    resolver: zodResolver(UpdateWarehouseSchema),
    defaultValues: {
      description: warehouse.description,
      stockPlace: warehouse.stockPlace,
    },
  });
  const updateWarehouseMutation = useUpdateWarehouse({
    onSuccess: () => {
      setOpen(false);
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi từ hệ thống vui lòng thử lại sau");
    },
  });
  const handleSubmit = (data: UpdateWarehouseDto) => {
    updateWarehouseMutation.mutate({
      id: warehouse.id,
      data: data,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-4">Cập nhật thông tin lô hàng</DialogTitle>
          {/* <DialogDescription>Chọn các sản phẩm từ kho</DialogDescription> */}
        </DialogHeader>
        <Form {...form} key="old">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSubmit)();
            }}
            className="w-full space-y-8"
          >
            <FormInput
              control={form.control}
              name="stockPlace"
              label="Nơi lưu trữ"
            />
            <FormTextarea
              name="description"
              label="Mô tả"
              control={form.control}
            />
            <div className="text-left">
              <Button type="submit">Cập nhật</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormUpdateInfo;
