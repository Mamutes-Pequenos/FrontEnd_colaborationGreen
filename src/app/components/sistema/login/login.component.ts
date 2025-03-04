import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showError: boolean = false;
  login: User = new User();
  roteador = inject(Router);
  loginService = inject(UserService);

  constructor() {
    if (typeof localStorage !== 'undefined') {

      let token = localStorage.getItem('token');
      if (token) {
        this.roteador.navigate(['/salas']);
      }
    }
  }

  logar() {
    console.log(this.login)
    this.loginService.login(this.login).subscribe({
      next: user => { // QUANDO DÁ CERTO
        if (typeof localStorage !== 'undefined') {
          this.loginService.addToken(user.token);
          this.loginService.addUser(user);
        }
        this.roteador.navigate(['/professor/salas']);
      },
      error: erro => { // QUANDO DÁ ERRO
        this.showError = true
        console.error(erro);

      }
    });


  }


}
