import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpCategory } from '../../../../core/services/http-category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editacategoria',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editacategoria.html',
  styleUrl: './editacategoria.css',
})
export class Editacategoria {
 idSeleccionado!: string | null;
  formData!: FormGroup;

  constructor(
    private httpCategoria:HttpCategory,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formData = new FormGroup({
      nombre: new FormControl('',[ Validators.required ]),
      descripcion: new FormControl('',[ Validators.required ]),
      activa: new FormControl(true)
    })
  }

  ngOnInit() {
    // Paso 1: Trae el ID de la ruta
    this.idSeleccionado = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.idSeleccionado );

    // Paso 2: Obtiene una categoria por ID (esta data rellenara el formulario)
    this.httpCategoria.getCategoriaPorId(this.idSeleccionado).subscribe({
      next: ( data ) => {
        console.log(data.categoria);

        // Paso 3: Rellenamos el formulario
        this.formData.patchValue({
          nombre: data.categoria.nombre,
          descripcion: data.categoria.descripcion,
          activa: data.categoria.activa
        })

      },
      error: ( error ) => {
        console.error(error);
      },
    })
  }

  onSubmit() {
    if (this.formData.valid){
      console.log(this.formData.value)

      // Paso 4: Actualiza los datos a partir de las modificaciones que hicimos en el formulario
      this.httpCategoria.updateCategory( this.idSeleccionado, this.formData.value ).subscribe({
        next: ( data ) => {
          console.log( data );
          this.formData.reset();
          this.router.navigateByUrl('/listacategoria')
        },
        error: ( err ) => {
          console.error( err );
        },
        complete: () => {},
      })

    }
    else{
      console.log('Formulario no valido')
    }
  }
}
