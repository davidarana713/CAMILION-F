import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpCategory } from '../../../../core/services/http-category';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpProduct } from '../../../../core/services/http-product';

@Component({
  selector: 'app-craproducto',
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
  templateUrl: './craproducto.html',
  styleUrl: './craproducto.css',
})
export class Craproducto {

  // Paso 1: Define el atributo de clase publica (Datos que se van a renderizar), Observa por cambios, transfiere los datos
  public categories: Observable<any[]> = new Observable<any[]>();

  // Paso 2: Trigger (Disparador), donde se guardan los datos.
  private refreshTriggerCategories$ = new BehaviorSubject<void>(undefined);

  formData!: FormGroup;

  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct,
    private router: Router
  ){
    this.formData = new FormGroup({
      nombre : new FormControl('', [ Validators.required ]),
      descripcion: new FormControl('', [ Validators.required ]),
      precio: new FormControl(0, [ Validators.required ]),
      categoria: new FormControl('', [ Validators.required ]),
      talla: new FormControl('NO APLICA', [ Validators.required ]  ),
      stock: new FormControl(0, [ Validators.required ]),
      img: new FormControl('')
    })
  }

  // En el Hook del ciclo de vida de inicializacion del componente, llamo todas las peticiones de datos que requiero para registrar
  ngOnInit() {
    this.categories = this.refreshTriggerCategories$.pipe(
      switchMap( () => this.httpCategory.getCategories() )
    );
  }

  onSubmit(){

    // Validando si las reglas del formulario son validas
    if( this.formData.valid ) {
      console.log(this.formData.value)

      // Usa el servicio para lanzar la peticion al BackEnd
      this.httpProduct.createProduct(this.formData.value).subscribe({
        next: ( data ) => {
          console.log(data);
          // Limpiar el formulario
          this.formData.reset();
          // Redireccionar a la lista de productos
          this.router.navigateByUrl('listaproducto')
        },
        error: ( error ) => {
          console.error(error);
        },
        complete: () => {

        }
      })

    }
    else {
      console.log('Formulario no valido')
    }

  }

}
