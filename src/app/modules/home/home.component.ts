import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/models/post';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  posts: any;

  constructor(
    private postService: PostService
  ) {}
  
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => {
      this.posts = response;
      console.log(response)
    });
  }
}
