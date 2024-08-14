import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  if (authService.token) {
    const token = `Bearer ${authService.token}`
    req = req.clone({
      headers: req.headers.set("Authorization", token)
    });
  }
  
  return next(req);
};
