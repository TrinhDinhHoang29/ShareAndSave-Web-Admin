import FormCreateExportInvoice from "@/components/export-invoices/form-create-export-invoice";
import NotifycationExport from "@/components/export-invoices/notification-export";
import { Main } from "@/components/layout/main";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateExportInvoicePage() {
  const navigate = useNavigate();
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
            <FormCreateExportInvoice />
          </div>
        </div>
      </Main>
    </>
  );
}
