import { AppointmentStatus } from "@/types/status.type";

export interface IAppointment {
  appointmentItems: IAppointmentItem[];
  createdAt: string;
  endTime: string;
  id: number;
  startTime: string;
  status: AppointmentStatus;
  userID: number;
  userName: string;
}
export interface IAppointmentItem {
  actualQuantity: number;
  appointmentID: number;
  categoryName: string;
  id: number;
  itemID: number;
  itemImage: string;
  itemName: string;
  missingQuantity: number;
}
