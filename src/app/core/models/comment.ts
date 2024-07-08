import { User } from "./user";

export class Comment {
  commentId: number;
  content: string;
  createdOn: Date;
  postId: number;
  userId: string;
  user: User;
}