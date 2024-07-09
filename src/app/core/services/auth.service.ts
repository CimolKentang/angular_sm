import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + "/auth"

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }
  
  get isAuthorized() {
    const token = this.localStorage.getItem("token");

    if (token) {
      return true;
    }

    return false;
  }

  login(body: any): Observable<any> {
    return this.http.post(this.apiUrl + "/login", body).pipe((map(response => response)));
  }
}
