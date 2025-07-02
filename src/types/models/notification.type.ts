import { TargetTypeNotification, TypeNotification } from "@/types/status.type";

export interface INotification {
  content: string;
  createdAt: string;
  id: number;
  isRead: boolean;
  receiverID: number;
  senderID: number;
  targetID: number;
  targetType: TargetTypeNotification;
  type: TypeNotification;
}
