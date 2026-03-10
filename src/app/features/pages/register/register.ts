import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpRegister } from '../../../core/services/http-register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formData!: FormGroup;

  constructor(
    private httpUsuario:HttpRegister,
    private router: Router
  ){
    this.formData = new FormGroup({
      nombre: new FormControl('',[ Validators.required ]),
      correo: new FormControl('',[ Validators.required,Validators.email]),
      telefono: new FormControl('',[ Validators.required,Validators.minLength(10)]),
      edad: new FormControl('',[ Validators.required ]),
      pin: new FormControl('',[ Validators.required ]),
      confirmapin: new FormControl('',[ Validators.required ]),
      rol: new FormControl('usuario',[ Validators.required ])

    })
  }

  onSubmit(){
    if(this.formData.valid){
     console.log(this.formData.value)
    this.httpUsuario.createUsuario(this.formData.value).subscribe({
      next:(data)=>{
       console.log(data)
        this.formData.reset();

      },
      error:(error) =>{
        console.error(error);
      },
      complete:() =>{

      }
    })

    }
    else{
      console.log('Formulario de registro no valido')
    }
  }

}
