import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = environment.apiUrl + '/quiz'

  constructor(
    private http: HttpClient
  ) {}

  createQuiz(body: any): Observable<any> {
    return this.http.post(this.url, body).pipe(map(response => response));
  }
}
