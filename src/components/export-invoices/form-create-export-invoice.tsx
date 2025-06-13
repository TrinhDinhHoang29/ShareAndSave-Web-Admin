import { SenderSelect } from "@/components/import-invoices/sender-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { SelectForm } from "@/components/ui/select-form";
import FormTextarea from "@/components/ui/textarea-form";
import {
  CreateItemImportInvoiceDto,
  CreateItemImportInvoiceSchema,
} from "@/schemas/import-invoices/create-item-import-invoice";
import { ClassifyExportInvoice } from "@/types/status.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormCreateExportInvoice = () => {
  const form = useForm<CreateItemImportInvoiceDto>({
    resolver: zodResolver(CreateItemImportInvoiceSchema),
  });
  return (
    <div className="border rounded-md">
      <div className="p-8">
        <Form {...form} key="old">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full space-y-8 grid sm:grid-cols-2 gap-4 grid-cols-1"
          >
            <div className="col-span-1">
              <SenderSelect
                control={form.control}
                label="Tên người nhận"
                name="senderID"
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={form.control}
                name="name"
                label="Tên sản phẩm"
              />
            </div>
            <div className="col-span-1">
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
                label="Loại phiếu nhập"
              />
            </div>
            <div className="col-span-1">
              <FormTextarea
                name="description"
                label="Mô tả"
                control={form.control}
              />
            </div>
            <div className="text-left col-span-2">
              <Button type="submit">Tạo phiếu xuất</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormCreateExportInvoice;
