import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  constructor( private http: HttpClient ) {}

  createProduct( nuevoProducto: any ) {
    return this.http.post('http://localhost:3000/api/v1/producto', nuevoProducto)
  }
 getProducts() {
    return this.http.get<any>('http://localhost:3000/api/v1/producto').pipe(
      tap( (response) => console.log(response) ),
      map( response => {

        return response.producto
      })
    )
  }

  getProductoPorId(id:string | null){
    return this.http.get<any>(`http://localhost:3000/api/v1/producto/${id}`)
  }

  deleteProduct(id:string){
    return this.http.delete<any>(`http://localhost:3000/api/v1/producto/${id}`)
  }

  updateProducto(id:string | null,productoActualizado:any){
    return this.http.patch<any>(`http://localhost:3000/api/v1/producto/${id}`,productoActualizado)
  }

}
