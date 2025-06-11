import { WarehouseItemStatus } from "@/types/status.type";

export interface IItemWarehouse {
  id: number;
  imageItem: string;
  nameItem: string;
  categoryName: string;
  code: string;
  description: string;
  status: WarehouseItemStatus;
}
