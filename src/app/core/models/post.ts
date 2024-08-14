import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export class Post {
  postId: number;
  content: string;
  createdOn: Date;
  comments: [Comment];
  images: string;
  likes: [Like];
  userId: string;
  user: User;
}