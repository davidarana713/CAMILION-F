import { Component, ChangeDetectorRef } from '@angular/core';
import { CartTs } from '../../../core/services/cart.ts';
import { CartModel } from '../../../models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { DataProduct } from '../../../models/product.model.js';
import { HttpProduct } from '../../../core/services/http-product';
import { HttpCarrito } from '../../../core/services/http-carrito';
import { Alertas } from '../../../core/services/alertas';

@Component({
  selector: 'app-carrito',
  imports: [ CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  cartItem: CartModel[] | undefined;

  constructor(
    private cartTs: CartTs,
    private httpProduct: HttpProduct,
    private httpCarrito: HttpCarrito,
    private alertas: Alertas,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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

  onFinalizarCompra() {
    // Validar que el carrito no esté vacío
    if (!this.cartItem || this.cartItem.length === 0) {
      this.alertas.alertCartError('El carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    // Preparar el array de productos con sus IDs y cantidades para enviar al backend
    const productosParaActualizarStock = this.cartItem.map((item) => ({
      productoId: item.product._id,
      cantidad: item.quantity
    }));

    console.log('Productos a actualizar en stock:', productosParaActualizarStock);

    // PASO 1: Actualizar el stock de todos los productos en el backend (en una sola petición)
    this.httpProduct.actualizarStockMultiple(productosParaActualizarStock).subscribe(
      (response: any) => {
        console.log('Stock actualizado correctamente en el backend:', response);

        // PASO 2: Si la actualización fue exitosa, proceder con finalizar la compra
        if (response.success) {
          const carritoId = localStorage.getItem('carritoId');

          if (carritoId) {
            // PASO 3: Notificar al backend para eliminar todos los productos del carrito
            this.httpCarrito.finalizarCompra(carritoId).subscribe(
              (carritoResponse: any) => {
                console.log('Compra finalizada en el backend:', carritoResponse);

                // PASO 4: Limpiar el carrito localmente
                this.cartTs.clearCart();
                // Asignar un nuevo array vacío para que Angular detecte el cambio
                this.cartItem = [];
                // Forzar la detección de cambios en Angular
                this.changeDetectorRef.detectChanges();

                // Mostrar mensaje de éxito
                this.alertas.alertCartUpdate('¡Compra finalizada exitosamente! Gracias por tu compra.');
              },
              (error) => {
                console.error('Error al finalizar compra en el backend:', error);
                this.alertas.alertCartError('Error al finalizar la compra. Por favor, intenta de nuevo.');
              }
            );
          } else {
            console.warn('No se encontró carritoId. Limpiando carrito localmente.');
            // Si no hay carritoId, al menos limpia localmente
            this.cartTs.clearCart();
            this.cartItem = [];
            // Forzar la detección de cambios en Angular
            this.changeDetectorRef.detectChanges();
            this.alertas.alertCartUpdate('¡Stock actualizado y compra finalizada! (Carrito no sincronizado con servidor)');
          }
        } else {
          // Si hubo errores en la actualización del stock
          this.alertas.alertCartError('Error al actualizar el stock de los productos. Compra no finalizada.');
          console.error('Detalles de errores:', response.resultados);
        }
      },
      (error) => {
        console.error('Error al actualizar stock de los productos:', error);
        this.alertas.alertCartError('Error al procesar la compra. Por favor, intenta de nuevo.');
      }
    );
  }
}
