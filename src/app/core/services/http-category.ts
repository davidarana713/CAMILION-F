import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor( private http: HttpClient ) {}


  creaCategoria(nuevaCategoria: any ){
  return this.http.post('http://localhost:3000/api/v1/categoria', nuevaCategoria)
}


  // Peticion para obtener todas las categorias
  getCategories() {
    return this.http.get<any>('http://localhost:3000/api/v1/categoria').pipe(
      map( ( data ) => {
        return data.categoria
      } )
    );

  }

  deleteCategoria(id:string){
    return this.http.delete<any>(`http://localhost:3000/api/v1/categoria/${id}`)
  }

}
