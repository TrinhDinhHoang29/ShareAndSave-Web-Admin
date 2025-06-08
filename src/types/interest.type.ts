export interface IInterest {
  id: number;
  interests: {
    id: number;
    postID: number;
    status: number;
    userAvatar: string;
    userID: number;
    userName: string;
  }[];
  items: {
    categoryName: string;
    id: number;
    image: string;
    name: string;
    quantity: number;
  }[];
  slug: string;
  title: string;
  type: number;
}
