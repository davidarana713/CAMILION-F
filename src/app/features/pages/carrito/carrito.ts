import { Component } from '@angular/core';
import { CartTs } from '../../../core/services/cart.ts';
import { CartModel } from '../../../models/cart.model';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { DataProduct } from '../../../models/product.model.js';

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

  onTotal(){
    return this.cartTs.cartCalcular();
  }
  onIncrease(product: DataProduct) {
    console.log("Incrementa 1");
    this.cartTs.updateToCart(product, +1)// Asegurarse de tener el carrito actualizado antes de actualizar un producto
    this.ngOnInit(); // Actualizar la vista después de modificar el carrito
  }
  onDecrease(product: DataProduct) {
    console.log("Decrementa 1")
    this.cartTs.updateToCart(product, -1)// Asegurarse de tener el carrito actualizado antes de actualizar un producto
    this.ngOnInit(); // Actualizar la vista después de modificar el carrito
  }
  onRemove(product: DataProduct){
    console.log("Elimina el producto del carrito")
    this.cartTs.updateToCart(product, 0)// Asegurarse de tener el carrito actualizado antes de actualizar un producto
    this.ngOnInit(); // Actualizar la vista después de modificar el carrito
  }
}
