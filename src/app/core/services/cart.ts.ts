import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { DataProduct } from '../../models/product.model';
import { CartModel } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartTs {

  cartItems: CartModel[] = [];
  constructor () { }
  // Paso 1: Obtener el carrito actual del localStorage, si no existe, inicializarlo como un array vacío
   getCartItems(){
    const cartString = localStorage.getItem("ShoppingCart");
   return cartString ? JSON.parse(cartString) : [];
  }

  private saveCartItems(cart: CartModel[]){
    localStorage.setItem("ShoppingCart",JSON.stringify(cart));

  }
  addToCart(product: DataProduct) {


     this.cartItems = this.getCartItems(); // Asegurarse de tener el carrito actualizado antes de agregar un producto


    // Paso 2: Verificar si el producto ya existe en el carrito
   const existeItem = this.cartItems.find((item: CartModel ) =>{
     return item.product._id === product._id;
    });

    // verificar que la cantidad del producto NO este definida
    if(product.stock === undefined){
      alert("la cantidad del producto no esta definida ");
         Swal.fire({
  position: "center",
  icon: "success",
  title: `la cantidad del producto no esta definida `,
  showConfirmButton: false,
  timer: 1500
});

      return;
    }
    // Paso 2.1: Si el producto ya existe, incrementar la cantidad


    if(existeItem){
      if(existeItem.quantity +1 <= product.stock ){

        existeItem.quantity ++;

        Swal.fire({
  position: "center",
  icon: "success",
  title: `Se ha agregado ${existeItem.quantity} ${existeItem.product.nombre} al Carrito`,
  showConfirmButton: false,
  timer: 1500
});
      }else{

                   Swal.fire({
  position: "center",
  icon: "success",
  title: `solo hay ${product.stock} unidades disponibles`,
  showConfirmButton: false,
  timer: 1500
});

        return;
      }

    }else{
      // agregar el nuevo producto al carrito, con cantidad 1, siempre y cuando haya stock disponible
        if(product.stock >= 1 ){

          const newCartItem: CartModel = {
            product: product,
            quantity: 1
          };

            this.cartItems.push(newCartItem)
              Swal.fire({
  position: "center",
  icon: "success",
  title: `Se ha agregado 1 ${product.nombre} al Carrito`,
  showConfirmButton: false,
  timer: 1500
});
    }else{
      // alert("No hay stock disponible para este producto");
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "No hay stock disponible para este producto",

});
      return;
    }
  }
  // Paso 3: Guardar el carrito actualizado en el localStorage
  this.saveCartItems(this.cartItems);

}}
