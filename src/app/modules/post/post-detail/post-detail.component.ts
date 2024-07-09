import { AfterViewInit, Component } from '@angular/core';
import { Post } from '../../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NgIf, DatePipe,NgFor],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements AfterViewInit {
  post: Post;
  postId: string | null;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngAfterViewInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.postId) {
      this.getPostById(this.postId); 
    }
  }

  getPostById(id: string) {
    this.postService.getPostById(id).subscribe(result => {
      this.post = result;
    })
  }
}
