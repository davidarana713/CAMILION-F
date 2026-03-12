import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRegister {
  constructor(private http: HttpClient) { }
  createUsuario(nuevousuario: any) {
    return this.http.post('http://localhost:3000/api/v1/registro', nuevousuario)
  }

  getUsuario() {
    return this.http.get<any>('http://localhost:3000/api/v1/registro').pipe(tap((response) => console.log(response)),
      map(response => {
        return response.registro
      })
    )
  }

  deleteUsuario( id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/v1/registro/${id}`)
  }

}
