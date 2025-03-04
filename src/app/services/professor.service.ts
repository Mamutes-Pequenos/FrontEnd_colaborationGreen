import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Professor } from '../models/professor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  API: string = 'http://localhost:8080/professor';
  http = inject(HttpClient);

  constructor() { }

  buscaProfessorPorUserId(idUser: Number){
    return this.http.get<Professor>(this.API + `/buscar/user_id?id=${idUser}`);

  }
}
