import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('navcontainer', {static: false}) navcontainer: ElementRef<any>

  user: any;

  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
