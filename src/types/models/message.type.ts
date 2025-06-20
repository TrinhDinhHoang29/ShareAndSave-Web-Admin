export interface IMessage {
  message: string;
  senderID: number;
  createdAt: string;
  id?: number;
  interestID?: number;
  isRead?: number;
  receiverID?: number;
}
