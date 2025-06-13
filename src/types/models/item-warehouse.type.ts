import { WarehouseItemStatus } from "@/types/status.type";

export interface IItemWarehouse {
  id: number;
  imageItem: string;
  itemName: string;
  categoryName: string;
  code: string;
  description: string;
  createdAt: string;
  status: WarehouseItemStatus;
}
