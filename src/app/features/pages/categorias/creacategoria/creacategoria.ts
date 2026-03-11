import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { HttpCategory } from '../../../../core/services/http-category';


@Component({
  selector: 'app-creacategoria',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './creacategoria.html',
  styleUrl: './creacategoria.css',
})
export class Creacategoria {
  formData!: FormGroup;

  constructor(
    private httpCategoria:HttpCategory,
    private router: Router
  ) {
    this.formData = new FormGroup({
      nombre: new FormControl('',[ Validators.required ]),
      descripcion: new FormControl('',[ Validators.required ]),
      activa: new FormControl(true)
    })
  }

  // Obtener los datos del formulario (boton se presione)
  onSubmit() {
    if (this.formData.valid){
      console.log(this.formData.value)
      this.httpCategoria.creaCategoria(this.formData.value).subscribe({
        next:(data:any)=>{
          console.log(data);
          this.router.navigateByUrl('listacategoria')
        },
        error:(error: any ) =>{
          console.error(error);
        },
        complete:() => {

        }
      })
    }
    else{
      console.log('Formulario no valido')
    }
  }
}
