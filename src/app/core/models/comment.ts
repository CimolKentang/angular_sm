import { User } from "./user";

export class Comment {
  commentId: number;
  content: string;
  createdOn: string;
  postId: number;
  userId: string;
  user: User;
}