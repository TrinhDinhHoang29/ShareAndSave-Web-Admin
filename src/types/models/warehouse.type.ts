import { IItemWarehouse } from "@/types/models/item-warehouse.type";
import { ClassifyWarhouse } from "@/types/status.type";

export interface IWarehouse {
  id: number;
  SKU: string;
  quantity: number;
  description?: string;
  receiverName: string;
  senderName: string;
  classify: ClassifyWarhouse;
  stockPlace: string;
  createdAt: string;
  itemWarehouses: IItemWarehouse[];
}
