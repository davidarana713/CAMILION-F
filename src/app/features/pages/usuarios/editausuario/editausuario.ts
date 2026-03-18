import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRegister } from '../../../../core/services/http-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editausuario',
  imports: [ReactiveFormsModule],
  templateUrl: './editausuario.html',
  styleUrl: './editausuario.css',
})
export class Editausuario {
 idSeleccionado!: string | null;
  formData!: FormGroup;

  constructor(
    private httpUsuario:HttpRegister,
    private activateRoute: ActivatedRoute,
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

 ngOnInit(){
  this.idSeleccionado = this.activateRoute.snapshot.paramMap.get('id');
  console.log(this.idSeleccionado);

  this.httpUsuario.getUsuarioPorId(this.idSeleccionado).subscribe({
    next: (data) =>{
      console.log(data.registro);

      this.formData.patchValue({
        nombre: data.registro.nombre,
        correo: data.registro.correo,
        telefono: data.registro.telefono,
        edad: data.registro.edad,
        pin: data.registro.pin,
        confirmapin: data.registro.confirmapin,
        rol: data.registro.rol
      })
    },
    error:(error)=>{
      console.error(error);
    }
  })
 }

 onSubmit(){
  if(this.formData.valid){
    console.log(this.formData.value)

    this.httpUsuario.updateUsuario(this.idSeleccionado,this.formData.value).subscribe({
      next: (data) =>{
        console.log(data);
        this.formData.reset();
        this.router.navigateByUrl('/listausuario')
      },
      error: (err)=>{
        console.error(err);
      },
      complete:() =>{},
    })
  }
  else{
    console.log('Formulario no valido')
  }
 }
}
