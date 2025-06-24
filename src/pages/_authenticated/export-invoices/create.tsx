import NotifycationExport from "@/components/export-invoices/notification-export";
import ListItemExport from "@/components/export-invoices/product-Items-card";
import { SenderSelect } from "@/components/import-invoices/sender-select";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectForm } from "@/components/ui/select-form";
import FormTextarea from "@/components/ui/textarea-form";
import { useCreateExportInvoice } from "@/hooks/react-query-hooks/use-export-invoice";
import {
  CreateExportInvoiceDto,
  CreateExportInvoiceSchema,
} from "@/schemas/export-invoices/create-export-invoice";
import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { ClassifyExportInvoice } from "@/types/status.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

export default function CreateExportInvoicePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useForm<CreateExportInvoiceDto>({
    resolver: zodResolver(CreateExportInvoiceSchema),
  });
  const [listItems, setListItems] = useState<IItemWarehouse[]>(state || []);
  const { ask } = useConfirm();
  const exportInvoiceMutation = useCreateExportInvoice({
    onSuccess: () => {
      toast.success("Tạo phiếu xuất thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống");
    },
  });
  const onSubmit = async (createExportInvoiceDto: CreateExportInvoiceDto) => {
    const confirm = await ask(
      "Bạn có chắc chắn muốn tạo phiếu nhập này không?"
    );
    if (confirm) {
      if (listItems.length === 0) {
        toast.error("Vui lòng thêm sản phẩm");
        return;
      }

      createExportInvoiceDto.itemExportInvoice = listItems.map((item) => ({
        itemWarehouseID: item.id,
      }));
      exportInvoiceMutation.mutate(createExportInvoiceDto);
    }
  };
  return (
    <>
      <Main>
        <div className="">
          <div className="mb-6">
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeftIcon />
              </button>
              <h1 className="text-2xl dark:text-white font-bold text-gray-900">
                Tạo phiếu xuất kho
              </h1>
            </div>
          </div>
          <div className="mb-6">
            <NotifycationExport />
          </div>
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-y-0 gap-y-4 ">
              <div className="col-span-2 sm:col-span-1 ">
                <div className="border p-6 rounded-lg shadow-lg">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-8"
                    >
                      <SenderSelect
                        control={form.control}
                        label="Chọn người nhận"
                        name="receiverID"
                      />
                      <SelectForm
                        control={form.control}
                        name="classify"
                        className="w-full"
                        placeholder="Chọn loại phiếu xuất"
                        data={[
                          {
                            field: ClassifyExportInvoice.LOSE_ITEM,
                            value: "Đồ thất lạc",
                          },
                          {
                            field: ClassifyExportInvoice.OLD_ITEM,
                            value: "Đồ cũ",
                          },
                        ]}
                        label="Loại phiếu xuất"
                      />
                      <FormTextarea
                        control={form.control}
                        name="description"
                        label="Mô tả"
                      />

                      <div className="flex justify-between items-center">
                        <Button type="submit">Tạo phiếu xuất</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 ">
                <ListItemExport
                  setListsNewItem={setListItems}
                  listItems={listItems}
                  onRemoveItem={(index) => {
                    const newItems = listItems.filter((_, i) => i !== index);
                    setListItems(newItems);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
