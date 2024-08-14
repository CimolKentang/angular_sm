import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from "../../core/shared/navbar/navbar.component";

@Component({
  selector: 'app-post-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './post-layout.component.html',
  styleUrl: './post-layout.component.css'
})
export class PostLayoutComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
