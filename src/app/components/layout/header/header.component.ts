import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  loginService = inject(UserService);

  constructor(private router: Router) {}

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      this.loginService.removerToken()
    }
    this.router.navigate(['/login']);
  }
}
