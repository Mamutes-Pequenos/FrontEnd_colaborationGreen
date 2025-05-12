import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  API: string = '/api/aluno';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.API + '/listar');
  }

  salvar(aluno: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.API, aluno);
  }

  save(aluno: Aluno): Observable<Aluno> {
    if (aluno.id !== undefined){
      console.log(aluno.id + '  edit');
      return this.http.put<Aluno>(this.API + '/editar?id=' + aluno.id, aluno);
    }
    console.log('save');

    return this.http.post<Aluno>(this.API, aluno);
  }

}
