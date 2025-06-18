import { TransactionStatus } from "@/types/status.type";

export interface ITransaction {
  createdAt: string;
  id: number;
  interestID: number;
  items: IItemTransaction[];
  receiverID: number;
  receiverName: string;
  senderID: number;
  senderName: string;
  status: TransactionStatus;
  updatedAt: string;
}
export interface IItemTransaction {
  itemID: number;
  itemImage: string;
  itemName: string;
  postItemID: number;
  quantity: number;
}
