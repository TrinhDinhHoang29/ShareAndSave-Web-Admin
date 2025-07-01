import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormTextarea from "@/components/ui/textarea-form";
import { useUpdateWarehouse } from "@/hooks/react-query-hooks/use-warehouse";
import {
  UpdateWarehouseDto,
  UpdateWarehouseSchema,
} from "@/schemas/warehouses/update-warehouse";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FormUpdateDescription = ({
  idWarehouse,
  itemWarehouse,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idWarehouse?: number;
  itemWarehouse: IItemWarehouse;
}) => {
  const form = useForm<UpdateWarehouseDto>({
    resolver: zodResolver(UpdateWarehouseSchema),
  });
  useEffect(() => {
    form.reset({
      description: itemWarehouse.description,
    });
  }, [itemWarehouse]);
  const updateWarehouseMutation = useUpdateWarehouse({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi từ hệ thống vui lòng thử lại sau");
    },
  });
  const handleSubmit = (data: UpdateWarehouseDto) => {
    updateWarehouseMutation.mutate({
      id: idWarehouse!,
      data: {
        itemWarehouses: [
          {
            id: itemWarehouse.id,
            description: data.description,
          },
        ],
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

export default FormUpdateDescription;
