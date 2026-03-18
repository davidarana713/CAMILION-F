import { Injectable } from '@angular/core';
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
  constructor (private alertas: Alertas) { }


  // Paso 1: Obtener el carrito actual del localStorage, si no existe, inicializarlo como un array vacío
   getCartItems(){
    const cartString = localStorage.getItem("ShoppingCart");
   return cartString ? JSON.parse(cartString) : [];
  }

  private saveCartItems(cart: CartModel[]){
    localStorage.setItem("ShoppingCart",JSON.stringify(cart));

  }




updateToCart(producT: DataProduct, cambio: number = 0){
  this.cartItems = this.getCartItems(); // Asegurarse de tener el carrito actualizado antes de actualizar un producto
  if(producT.stock){

    const existeItem =this.cartItems.find((item: CartModel)=> {
      return item.product._id === producT._id;

    });

    //Validar si existe el producto en el carrito
    if(existeItem){
      // console.log("Existe el producto en el carrito")
      // existeItem.quantity = (cambio === 0) ? 0 : existeItem.quantity + cambio;
      if(cambio === 0){
        existeItem.quantity = 0;
        this.alertas.alertCartUpdate(`El producto ${existeItem.product.nombre} se ha eliminado del carrito`);
        console.log("El producto se ha eliminado del carrito")
      }
      else if(cambio < 0){
        existeItem.quantity = existeItem.quantity + cambio;
          this.alertas.alertCartUpdate(`Se elimino ${Math.abs(cambio)} ${existeItem.product.nombre} del carrito`);
        console.log("first")

    }else if( (existeItem.quantity + cambio) <= producT.stock){
      existeItem.quantity = existeItem.quantity + cambio;

        this.alertas.alertCartUpdate(`Se agrego ${cambio} ${existeItem.product.nombre} al carrito`);

      console.log("second")
    }
    else{
      this.alertas.alertCartError(`No hay stock disponible para agregar ${cambio} ${existeItem.product.nombre} al carrito`);
      console.log("No hay stock disponible para agregar el producto al carrito")
    }
  }

    else{
  // console.log("No existe el producto en el carrito")

  const nuevoCart: CartModel = {
    product: producT,
    quantity: cambio

};
  this.cartItems.push(nuevoCart);
  this.alertas.alertCartUpdate(`Se ha agregado ${cambio} ${producT.nombre} al carrito`);

  console.log("Se agrego un producto nuevo al Carrito")
}
}
const borrarItem = this.cartItems.filter(item => item.quantity > 0); // Eliminar productos con cantidad 0
// console.log("removerItem",borrarItem)
if(borrarItem.length > 0 ){
  this.cartItems =this.cartItems.filter( (item) => item.quantity > 0);
}


this.saveCartItems(this.cartItems); }

cartCalcular(){
 const total = this.cartItems.reduce((total, item) => {

    //Asegurar que el precio y la cantidad no sean undefined o nulos
  const precio = item.product.precio ?? 0;
  const quantity = item.quantity ?? 0;
  return total + (precio * quantity);

},0);
return total + this.carrier; // Sumar el costo de envío al total
}
}

