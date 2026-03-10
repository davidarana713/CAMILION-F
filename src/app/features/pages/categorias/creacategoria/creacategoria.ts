import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creacategoria',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './creacategoria.html',
  styleUrl: './creacategoria.css',
})
export class Creacategoria {
  formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      activa: new FormControl(true)
    })
  }

  // Obtener los datos del formulario (boton se presione)
  onSubmit() {
    console.log(this.formData.value)
  }
}
