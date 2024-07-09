import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export class Post {
  postId: number;
  content: string;
  createdOn: Date;
  comments: [Comment];
  likes: [Like];
  userId: string;
  user: User;
}