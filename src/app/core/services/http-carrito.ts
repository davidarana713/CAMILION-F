import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCarrito {
  private apiUrl = 'http://localhost:3000/api/v1/carrito';

  constructor(private http: HttpClient) {}

  // Obtener carrito del usuario
  getCarrito(usuarioId: string) {
    return this.http.get(`${this.apiUrl}/${usuarioId}`);
  }

  // Crear carrito para un usuario
  crearCarrito(nuevoCarrito: any) {
    return this.http.post(this.apiUrl, nuevoCarrito);
  }

  // Agregar producto al carrito
  agregarProducto(carritoId: string, producto: any) {
    return this.http.post(`${this.apiUrl}/${carritoId}/productos`, producto);
  }

  // Actulizar cantidad de un producto en el carrito
  actualizarProducto(carritoId: string, productoId: string, cantidad: number) {
    return this.http.put(`${this.apiUrl}/${carritoId}/productos/${productoId}`, { cantidad });
  }

  // Eliminar un producto del carrito
  eliminarProducto(carritoId: string, productoId: string) {
    return this.http.delete(`${this.apiUrl}/${carritoId}/productos/${productoId}`);
  }

  // Limpiar todos los productos del carrito
  limpiarCarrito(carritoId: string) {
    return this.http.delete(`${this.apiUrl}/${carritoId}`);
  }

  // Finalizar compra (cambiar estado de carrito a completado)
  finalizarCompra(carritoId: string) {
    return this.http.put(`${this.apiUrl}/${carritoId}/finalizar`, {});
  }
}
