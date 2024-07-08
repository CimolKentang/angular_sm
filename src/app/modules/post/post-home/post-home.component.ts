import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-home',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './post-home.component.html',
  styleUrl: './post-home.component.css'
})
export class PostHomeComponent implements OnInit {
  posts: any;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(result => {
      this.posts = result;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['post/' + id]);
  }
}
