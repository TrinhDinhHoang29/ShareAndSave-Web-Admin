import { InterestType, PostType } from "@/types/status.type";

export interface IInterest {
  authorAvatar: string;
  authorID: number;
  authorName: string;
  createdAt: string;
  description: string;
  id: number;
  interests: {
    createdAt: string;
    id: number;
    postID: number;
    status: number;
    userAvatar: string;
    userID: number;
    userName: string;
    unreadMessageCount: number;
  }[];
  items: IItemInterest[];
  slug: string;
  title: string;
  type: PostType;
  updatedAt: string;
  unreadMessageCount: number;
}
export interface IItemInterest {
  categoryName: string;
  currentQuantity: number;
  id: number;
  image: string;
  itemID: number;
  name: string;
  quantity: number;
}
