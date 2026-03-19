import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DataProduct } from '../../models/product.model';
import { CartModel } from '../../models/cart.model';
import { Alertas } from './alertas';

@Injectable({
  providedIn: 'root',
})
export class CartTs {
  cartItems: CartModel[] = [];
  carrier: number = 10000; // Costo fijo de envío

  // BehaviorSubject para mantener el conteo de productos del carrito
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  constructor(private alertas: Alertas) {
    // Inicializar el conteo con los elementos que ya están en localStorage
    this.updateCartCount();
  }

  // Calcular la cantidad TOTAL de productos en el carrito (suma de todas las quantities)
  private calculateTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Actualizar el BehaviorSubject con la nueva cantidad de productos
  private updateCartCount(): void {
    const totalItems = this.calculateTotalItems();
    this.cartCountSubject.next(totalItems);
    console.log('Cantidad total de productos en carrito:', totalItems);
  }

  // Obtener el conteo actual de productos
  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  // Paso 1: Obtener el carrito actual del localStorage, si no existe, inicializarlo como un array vacío
  getCartItems() {
    const cartString = localStorage.getItem('ShoppingCart');
    return cartString ? JSON.parse(cartString) : [];
  }

  private saveCartItems(cart: CartModel[]) {
    localStorage.setItem('ShoppingCart', JSON.stringify(cart));
  }

  updateToCart(producT: DataProduct, cambio: number = 0) {
    // Validación inicial del producto
    if (!producT || !producT._id) {
      this.alertas.alertCartError('Producto inválido');
      console.error('Producto inválido:', producT);
      return;
    }

    // Validación del stock disponible
    if (!producT.stock || producT.stock <= 0) {
      this.alertas.alertCartError(`No hay stock disponible para ${producT.nombre}`);
      console.error('Stock insuficiente:', producT.nombre, 'Stock:', producT.stock);
      return;
    }

    // Obtener el carrito actualizado del localStorage
    this.cartItems = this.getCartItems();

    // Buscar si el producto ya existe en el carrito
    const existeItem = this.cartItems.find((item: CartModel) => {
      return item.product._id === producT._id;
    });

    // CASO 1: El producto ya existe en el carrito
    if (existeItem) {
      if (cambio === 0) {
        // Eliminar el producto completamente
        existeItem.quantity = 0;
        this.alertas.alertCartUpdate(
          `El producto ${existeItem.product.nombre} se ha eliminado del carrito`,
        );
        console.log('Producto eliminado del carrito:', existeItem.product.nombre);
      } else if (cambio > 0) {
        // Agregar más unidades
        const nuevaCantidad = existeItem.quantity + cambio;
        if (nuevaCantidad <= producT.stock) {
          existeItem.quantity = nuevaCantidad;
          this.alertas.alertCartUpdate(
            `Se agregaron ${cambio} unidades de ${existeItem.product.nombre} al carrito`,
          );
          console.log('Cantidad aumentada:', nuevaCantidad);
        } else {
          this.alertas.alertCartError(
            `No hay suficiente stock. Stock disponible: ${producT.stock}`,
          );
          console.log('Stock insuficiente para agregar:', nuevaCantidad);
          return;
        }
      } else if (cambio < 0) {
        // Disminuir unidades
        const nuevaCantidad = existeItem.quantity + cambio;
        if (nuevaCantidad > 0) {
          existeItem.quantity = nuevaCantidad;
          this.alertas.alertCartUpdate(
            `Se eliminó ${Math.abs(cambio)} unidad(es) de ${existeItem.product.nombre} del carrito`,
          );
          console.log('Cantidad disminuida:', nuevaCantidad);
        } else if (nuevaCantidad === 0) {
          existeItem.quantity = 0;
          this.alertas.alertCartUpdate(
            `El producto ${existeItem.product.nombre} se ha eliminado del carrito`,
          );
          console.log('Producto eliminado (cantidad llegó a 0)');
        } else {
          this.alertas.alertCartError('No puedes tener cantidad negativa');
          console.error('Intento de cantidad negativa');
          return;
        }
      }
    } else {
      // CASO 2: El producto NO existe en el carrito (es la primera vez que se agrega)
      if (cambio > 0) {
        if (cambio <= producT.stock) {
          const nuevoCart: CartModel = {
            product: producT,
            quantity: cambio,
          };
          this.cartItems.push(nuevoCart);
          this.alertas.alertCartUpdate(`Se ha agregado ${cambio} ${producT.nombre} al carrito`);
          console.log('Nuevo producto agregado al carrito:', producT.nombre);
        } else {
          this.alertas.alertCartError(
            `No hay suficiente stock. Stock disponible: ${producT.stock}`,
          );
          console.error('Stock insuficiente para nuevo producto');
          return;
        }
      } else {
        this.alertas.alertCartError('Debes agregar al menos 1 unidad del producto');
        console.error('Intento de agregar cantidad <= 0 de un producto nuevo');
        return;
      }
    }

    // Filtrar y eliminar productos con cantidad 0 o menor
    this.cartItems = this.cartItems.filter((item) => item.quantity > 0);

    // Guardar en localStorage
    this.saveCartItems(this.cartItems);

    // Actualizar el conteo de productos (IMPORTANTE)
    this.updateCartCount();
  }

  cartCalcular() {
    const total = this.cartItems.reduce((total, item) => {
      //Asegurar que el precio y la cantidad no sean undefined o nulos
      const precio = item.product.precio ?? 0;
      const quantity = item.quantity ?? 0;
      return total + precio * quantity;
    }, 0);
    return total + this.carrier; // Sumar el costo de envío al total
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItems(this.cartItems);
    this.alertas.alertCartUpdate('El carrito ha sido vaciado correctamente');

    // Actualizar el conteo a 0 (IMPORTANTE)
    this.updateCartCount();
  }
}
