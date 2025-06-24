import { ClassifyExportInvoice } from "@/types/status.type";

export interface IExportInvoice {
  classify: string;
  createdAt: string;
  invoiceNum: number;
  id: number;
  itemCount: ClassifyExportInvoice;
  receiverName: string;
  senderName: string;
}
