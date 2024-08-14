import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../core/models/post';
import { AuthService } from '../../../core/services/auth.service';
import { Like } from '../../../core/models/like';
import { PostContainerComponent } from "../../../core/shared/post-container/post-container.component";

@Component({
  selector: 'app-post-home',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DatePipe, ReactiveFormsModule, PostContainerComponent],
  templateUrl: './post-home.component.html',
  styleUrl: './post-home.component.css'
})
export class PostHomeComponent implements OnInit {
  posts: any;
  postForm: FormGroup;
  selectedImage: File;
  selectedImageUrl: string;
  user: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
    this.postForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(result => {
      this.posts = result;
    });
  }

  getUser() {
    this.user = this.authService.user;
  }

  selectImage(result: any) {
    if (result.target.files.length > 0) {
      this.selectedImage = result.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(result.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedImageUrl = event.target.result
      }
    }
  }

  deletePost(postId: any) {
    this.postService.deletePost(postId).subscribe(result => {
      this.posts = this.posts.filter((post: Post) => post.postId != postId);
    });
  }

  submit() {
    if (this.postForm.valid) {
      const formData = new FormData();
      const formValue = this.postForm.getRawValue();

      formData.append('content', formValue.content);
      if (this.selectedImage != null) {
        formData.append('images', this.selectedImage);
      }

      this.postService.createPost(formData).subscribe(result => {
        console.log(result);
        this.postForm.reset();
        this.selectedImageUrl = '';
        // this.posts.unshift(result as Post);
      });
    }
  }
}
