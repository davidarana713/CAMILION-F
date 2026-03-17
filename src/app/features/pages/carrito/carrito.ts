import { Component } from '@angular/core';
import { CartTs } from '../../../core/services/cart.ts';
import { CartModel } from '../../../models/cart.model';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [JsonPipe, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  cartItem: CartModel[] | undefined;

  constructor(private cartTs: CartTs) {}

  ngOnInit(){
    this.cartItem = this.cartTs.getCartItems();

  }
}
