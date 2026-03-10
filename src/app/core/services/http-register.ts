import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRegister {
  constructor(private http: HttpClient){}
    createUsuario(nuevousuario:any){
      return this.http.post('http://localhost:3000/api/v1/registro',nuevousuario)
    }

}
