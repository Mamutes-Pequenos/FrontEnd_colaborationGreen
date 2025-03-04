import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  API: string = 'http://localhost:8080/sala';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.API + '/listar');
  }

  save(sala: Sala): Observable<Sala> {
    console.log(JSON.stringify(sala));
    if (sala.id !== undefined){
      return this.http.put<Sala>(this.API + '/editar?id=' + sala.id, sala);
    }

    return this.http.post<Sala>(this.API, sala);
  }

}
