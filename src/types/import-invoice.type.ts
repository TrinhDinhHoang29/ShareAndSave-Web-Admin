import { ClassifyImportInvoice } from "@/types/status.type";

export interface IImportInvoice {
  classify: string;
  createdAt: string;
  id: number;
  itemCount: ClassifyImportInvoice;
  receiverName: string;
  senderName: string;
}
