import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor( private http: HttpClient ) {}

  // Peticion para obtener todas las categorias
  getCategories() {
    return this.http.get<any>('http://localhost:3000/api/v1/categoria').pipe(
      map( ( data ) => {
        return data.categoria
      } )
    );

  }

}
