import { Comment } from "./comment";
import { User } from "./user";

export class Post {
  postId: number;
  content: string;
  createdOn: Date;
  comments: [Comment];
  userId: string;
  user: User;
}