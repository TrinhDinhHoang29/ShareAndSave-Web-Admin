import { PostStatus, PostType } from "@/types/status.type";

export interface IPost {
  id: number;
  authorName: string;
  type: PostType;
  title: string;
  status: PostStatus;
  createdAt: string;
}
