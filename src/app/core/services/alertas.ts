import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Alertas {

  constructor() { }

  alertCartUpdate(title: string){
        Swal.fire({
      position: "center",
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }
  alertCartError(text: string){
     Swal.fire({
      icon: "error",
      title: "Oops...",
      text,

    });
}
}
