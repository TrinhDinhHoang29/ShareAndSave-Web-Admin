import ProductItemsCard from "@/components/import-invoices/product-Items-card";
import { SenderSelect } from "@/components/import-invoices/sender-select";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectForm } from "@/components/ui/select-form";
import FormTextarea from "@/components/ui/textarea-form";
import { useCreateImportInvoice } from "@/hooks/react-query-hooks/use-import-invoice";
import {
  CreateImportInvoiceDto,
  CreateImportInvoiceSchema,
} from "@/schemas/import-invoices/create-import-invoice";
import { CreateItemImportInvoiceDto } from "@/schemas/import-invoices/create-item-import-invoice";
import { ClassifyImportInvoice } from "@/types/status.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

const CreateImportInvoicePage = () => {
  const form = useForm<CreateImportInvoiceDto>({
    resolver: zodResolver(CreateImportInvoiceSchema),
  });
  const navigate = useNavigate();
  const [listItems, setListItems] = useState<CreateItemImportInvoiceDto[]>([]);
  const { ask } = useConfirm();
  const ImportInvoiceMutation = useCreateImportInvoice({
    onSuccess: () => {
      toast.success("Tạo phiếu nhập thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống");
    },
  });
  const onSubmit = async (createImportInvoiceDto: CreateImportInvoiceDto) => {
    const confirm = await ask(
      "Bạn có chắc chắn muốn tạo phiếu nhập này không?"
    );
    if (confirm) {
      if (listItems.length === 0) {
        toast.error("Vui lòng thêm sản phẩm");
        return;
      }

      createImportInvoiceDto.itemImportInvoice = listItems;
      ImportInvoiceMutation.mutate(createImportInvoiceDto);
      navigate("/import-invoices");
    }
  };
  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Thêm phiếu nhập
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Nơi dùng để thêm phiếu nhập, lúc nhập hàng
          </p>
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
                      label="Tên người gửi"
                      name="senderID"
                    />
                    <SelectForm
                      control={form.control}
                      name="classify"
                      className="w-full"
                      placeholder="Chọn loại phiếu nhập"
                      data={[
                        {
                          field: ClassifyImportInvoice.LOSE_ITEM,
                          value: "Đồ thất lạc",
                        },
                        {
                          field: ClassifyImportInvoice.OLD_ITEM,
                          value: "Đồ cũ",
                        },
                      ]}
                      label="Loại phiếu nhập"
                    />
                    <FormTextarea
                      control={form.control}
                      name="description"
                      label="Mô tả"
                    />

                    <div className="flex justify-between items-center">
                      <Button type="submit">Tạo phiếu nhập</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 ">
              <ProductItemsCard
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
  );
};

export default CreateImportInvoicePage;
