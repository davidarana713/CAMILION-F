import { Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpProduct } from '../../../../core/services/http-product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-editaproducto',
  imports: [ReactiveFormsModule,RouterLink,AsyncPipe],
  templateUrl: './editaproducto.html',
  styleUrl: './editaproducto.css',
})
export class Editaproducto {
   idSeleccionado!: string | null;
   formData!: FormGroup;

  // Paso 1: Define el atributo de clase publica (Datos que se van a renderizar), Observa por cambios, transfiere los datos
  public categories: Observable<any[]> = new Observable<any[]>();

  // Paso 2: Trigger (Disparador), donde se guardan los datos.
  private refreshTriggerCategories$ = new BehaviorSubject<void>(undefined);



  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct,
    private activateRoute: ActivatedRoute,
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

  ngOnInit() {
   this.categories = this.refreshTriggerCategories$.pipe(
      switchMap( () => this.httpCategory.getCategories() )
    );

    this.idSeleccionado= this.activateRoute.snapshot.paramMap.get('id');
   console.log(this.idSeleccionado);

   this.httpProduct.getProductoPorId(this.idSeleccionado).subscribe({
    next:(data)=>{
      console.log(data.producto);

      this.formData.patchValue({
        nombre: data.producto.nombre,
        descripcion: data.producto.descripcion,
        precio: data.producto.precio,
        categoria: data.producto.categoria,
        talla: data.producto.talla,
        stock: data.producto.stock,
        img: data.producto.img

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

      this.httpProduct.updateProducto(this.idSeleccionado,
        this.formData.value).subscribe({
          next:(data)=>{
            console.log(data);
            this.formData.reset();
            this.router.navigateByUrl('/listaproducto')
          },
          error: (err)=>{
            console.error(err);
          },
          complete(){},
        })
    }

    else{
      console.log('Formulario de producto no valido')
    }

  }

}
