import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NgIf, DatePipe,NgFor, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements AfterViewInit, OnInit {
  post: Post;
  postId: string | null;
  commentForm: FormGroup;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private commentService: CommentService
  ) { }
  
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

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

  onSubmitComment() {
    if (this.commentForm.valid && this.postId != null) {
      this.commentService
        .postComment(parseInt(this.postId), this.commentForm.getRawValue())
        .subscribe(result => {
          this.commentForm.get('content')?.setValue('');
          this.post.comments.unshift(result);
        });
    }
  }
}
