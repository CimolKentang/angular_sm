import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Like } from '../../models/like';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [DatePipe, NgIf, NgClass],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.css'
})
export class PostContainerComponent {
  imagesUrl = environment.imagesUrl;

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  
  @Input() post: Post;
  @Input() userId: string;
  @Input() isDetail: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  goToDetail() {
    if (!this.isDetail) { 
      this.router.navigate(['post/' + this.post.postId]);
    }
  }

  likePost() {
    this.postService.likePost(this.post.postId).subscribe(result => {
      if (this.post.likes.find((like: Like) => like.likeId == result.likeId)) {
        this.post.likes = this.post.likes.filter((like: Like) => like.likeId != result.likeId) as [Like];
      } else {
        this.post.likes.push(result);
      }
    });
  }

  get myLike(): boolean {
    let isLiked: boolean = false;

    const myLike = this.post.likes.find((like: Like) => like.userId == this.userId);

    if (myLike !== undefined) {
      isLiked = true;
    }

    return isLiked;
  }

  deletePost() {
    this.onDelete.emit(this.post.postId);
  }
}
