import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-home',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DatePipe, ReactiveFormsModule],
  templateUrl: './post-home.component.html',
  styleUrl: './post-home.component.css'
})
export class PostHomeComponent implements OnInit {
  posts: any;
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.postForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(result => {
      this.posts = result;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['post/' + id]);
  }

  submit() {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.getRawValue()).subscribe(result => {
        console.log(result);
        this.postForm.get('content')?.setValue('');
      })
    }
  }
}
