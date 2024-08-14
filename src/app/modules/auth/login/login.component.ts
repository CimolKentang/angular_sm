import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get fC() { return this.loginForm.controls }

  submit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(result => {
      const user = new User;
      user.id = result.id;
      user.email = result.email;
      user.userName = result.userName;

      this.localStorage.setItem("user", JSON.stringify(user));
      this.localStorage.setItem("token", result.token);
      this.router.navigateByUrl('/post');
    });
  }
}
