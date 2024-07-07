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
    return this.http.get(this.apiUrl).pipe(map((response) => response as [Post] ))
  }
}
