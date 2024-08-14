import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl + '/comment';

  constructor(
    private http: HttpClient
  ) { }

  postComment(postId: number, body: any): Observable<Comment> {
    return this.http.post(`${this.apiUrl}/${postId}`, body).pipe(map(response => response as Comment));
  }
}
