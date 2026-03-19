import { AsyncPipe } from '@angular/common';
import { CartTs } from './../../../core/services/cart.ts';
import { Component, OnInit } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Observable que emite el conteo de productos del carrito
  cartCount$: Observable<number>;

  constructor(public cartService: CartTs) {
    // Se inicializa en ngOnInit
    this.cartCount$ = new Observable();
  }

  ngOnInit() {
    // Suscribirse al Observable del servicio del carrito
    this.cartCount$ = this.cartService.cartCount$;
    console.log('Header inicializado - Escuchando cambios en el carrito');
  }
}
