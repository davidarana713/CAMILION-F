import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpProduct } from '../../../../core/services/http-product';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listaproducto',
  imports: [RouterLink, AsyncPipe, JsonPipe, CurrencyPipe],
  templateUrl: './listaproducto.html',
  styleUrl: './listaproducto.css',
})
export class Listaproducto {

  public estadoSubcripcionEliminar!: Subscription;

  // Paso 1: Define el atributo de clase publica (Datos que se van a renderizar), Observa por cambios, transfiere los datos
    public productos: Observable<any[]> = new Observable<any[]>();

    // Paso 2: Trigger (Disparador), donde se guardan los datos.
    private refreshTriggerProductos$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpProduct: HttpProduct,
    private router: Router

  ){}

  ngOnInit() {
    this.productos = this.refreshTriggerProductos$.pipe(
      switchMap( () => this.httpProduct.getProducts() )
    )
  }

  ngDestroy() {
    if( this.estadoSubcripcionEliminar ){
      this.estadoSubcripcionEliminar.unsubscribe();
    }
  }

  onEditar(id: string) {
    console.log( 'Editar producto por el ID ', id );
    this.router.navigate(['/editaproducto', id]);
  }

  onEliminar(id:string){
    console.log('Eliminar usuarios por el ID',id);
    this.estadoSubcripcionEliminar = this.httpProduct.deleteProduct(id).subscribe({
      next:(data)=>{
        console.log(data);
        this.refreshTriggerProductos$.next();
      },
      error:(err) =>{
        console.error(err);

      }
    });
  }
}
