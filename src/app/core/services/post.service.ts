import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl: string = environment.apiUrl + '/post'

  constructor(
    private http: HttpClient
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get(this.apiUrl).pipe(map((response) => response as [Post]));
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map(response => response as Post));
  }

  createPost(body: any): Observable<Post> {
    return this.http.post(this.apiUrl, body).pipe(map(response => response as Post));
  }
}
