export enum PostStatus {
  PENDING = 1,
  REJECTED = 2,
  APPROVED = 3,
  CANCEL = 4,
}
export enum PostType {
  GIVE_AWAY_OLD_ITEM = 1,
  FOUND_ITEM = 2,
  SEEK_LOST_ITEM = 3,
  WANT_OLD_ITEM = 4,
  CAMPAIGN = 5,
  OTHER = 6,
}
export enum ClassifyImportInvoice {
  ALL = 0,
  OLD_ITEM = 1,
  LOSE_ITEM = 2,
}
export enum ClassifyWarhouse {
  ALL = 0,
  OLD_ITEM = 1,
  LOSE_ITEM = 2,
}
export enum ClassifyExportInvoice {
  ALL = 0,
  OLD_ITEM = 1,
  LOSE_ITEM = 2,
}
export enum WarehouseItemStatus {
  INSTOCK = 1,
  OUTSTOCK = 2,
}
export enum InterestType {
  INTERESTED = 1,
  FOLLOWING = 2,
}
export enum TransactionStatus {
  PENDING = 1,
  SUCCESS = 2,
  REJECTED = 3,
  CANCELLED = 4,
}
export enum InterestStatus {}

export enum DeliveryMethod {
  MEETINPERSON = "Gặp trực tiếp",
  DELIVERY = "Giao hàng",
}
export enum AppointmentStatus {
  APPROVED = 1,
  REJECTED = 2,
}
export enum PostOf {
  CLIENT = 1,
  ADMIN = 2,
}
export enum GoodDeedType {
  GIVE_OLD_ITEM = 1,
  GIVE_LOSE_ITEM = 2,
  CAMPAIGN = 3,
}
export enum TargetTypeNotification {
  TRANSACTION = "transaction",
  APPOINTMENT = "appointment",
}
export enum TypeNotification {
  NORMAL = "normal",
  SYSTEM = "system",
}
