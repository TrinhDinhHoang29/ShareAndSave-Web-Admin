import { IInterest } from "@/types/models/interests.type";
import { IItem } from "@/types/models/item.type";
import { PostStatus, PostType } from "@/types/status.type";

export interface IPost {
  id: number;
  authorName: string;
  type: PostType;
  title: string;
  status: PostStatus;
  createdAt: string;
  description: string;
  images: string[];
  isFeatured: boolean;
  tags: string[];
  info: string;
  content: string;
  interests: IInterest[];
  items: IItem[];
  slug: string;
  isInterest: boolean;
}
