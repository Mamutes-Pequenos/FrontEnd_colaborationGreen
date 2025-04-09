import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API: string = '/api/user';
  http = inject(HttpClient);

  constructor() { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.API + '/login', user);
  }
  // Metodos do token

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  addUser(professor: User){
    localStorage.setItem('id', professor.id.toString());
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIdUser(){
    return localStorage.getItem('id')
  }

  // jwtDecode() {
  //   let token = this.getToken();
  //   if (token) {
  //     return this.jwtDecode<JwtPayload>(token);
  //   }
  //   return "";
  // }

  // hasPermission(role: string) {
  //   let Usuario = this.jwtDecode() as User;
  //   if (Usuario.role == role)
  //     return true;
  //   else
  //     return false;
  // }

}
