export interface DataProduct{
    _id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    img: string;
    stock: number; // Agrega esta propiedad para manejar la cantidad disponible del producto
}
