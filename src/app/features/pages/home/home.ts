import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataProduct } from '../../../models/product.model';
import { HttpProduct } from '../../../core/services/http-product';
import { CartTs } from '../../../core/services/cart.ts';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, JsonPipe, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {



  constructor(private httpProduct: HttpProduct,
    private cartServices: CartTs
  ) {}

  // Esto es para OBTENER LOS PRODUCTOS DESDE EL BACKEND, PERO NO SE MUESTRAN EN LA PAGINA PRINCIPAL, SOLO SE MUESTRAN EN LA PAGINA DE OFERTAS
  public estadoSubcripcionEliminar!: Subscription;

  // Paso 1: Define el atributo de clase publica (Datos que se van a renderizar), Observa por cambios, transfiere los datos
  public productos: Observable<any[]> = new Observable<any[]>();

  // Paso 2: Trigger (Disparador), donde se guardan los datos.
  private refreshTriggerProductos$ = new BehaviorSubject<void>(undefined);




  ngOnInit() {
    this.productos = this.refreshTriggerProductos$.pipe(
      switchMap( () => this.httpProduct.getProducts() )
    )

  }

  addToCart(product: DataProduct) {
    this.cartServices.updateToCart(product, +1);
  }
}
