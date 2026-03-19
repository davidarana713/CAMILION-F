import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpProduct } from '../../../../core/services/http-product';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-listaproducto',
  imports: [RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './listaproducto.html',
  styleUrl: './listaproducto.css',
})
export class Listaproducto {
    // Paso 1: Define el atributo de clase publica (Datos que se van a renderizar), Observa por cambios, transfiere los datos
    public productos: Observable<any[]> = new Observable<any[]>();

    // Paso 2: Trigger (Disparador), donde se guardan los datos.
    private refreshTriggerProductos$ = new BehaviorSubject<void>(undefined);

  constructor( private httpProduct: HttpProduct ){}

  ngOnInit() {
    this.productos = this.refreshTriggerProductos$.pipe(
      switchMap( () => this.httpProduct.getProducts() )
    )
  }
}
