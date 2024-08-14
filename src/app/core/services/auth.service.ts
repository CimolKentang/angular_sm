import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + "/auth"

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }
  
  get isAuthorized() {
    const token = this.localStorage.getItem("token");

    if (token) {
      return true;
    }

    return false;
  }

  get user(): User {
    const user = this.localStorage.getItem("user")!;

    return JSON.parse(user) as User
  }

  get token() {
    return this.localStorage.getItem("token");
  }

  login(body: any): Observable<any> {
    return this.http.post(this.apiUrl + "/login", body).pipe((map(response => response)));
  }

  logout() {
    this.localStorage.clear();
    this.router.navigateByUrl("/auth");
  }
}
