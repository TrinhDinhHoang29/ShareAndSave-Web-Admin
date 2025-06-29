import { GoodDeedType } from "@/types/status.type";

export interface IGoodDeed {
  createdAt: string;
  goodDeedType: GoodDeedType;
  goodPoint: number;
  id: number;
  items: {
    itemID: number;
    itemImage: string;
    itemName: string;
    postItemID: number;
    quantity: number;
  }[];
  transactionID: number;
  userID: number;
  userName: string;
}
