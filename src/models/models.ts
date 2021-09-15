export interface Restaurante {
    id: string;
    descripcion: string;
    menu: Producto[];
    url: string;
    titulo: string;
    localidad: string;
}

export interface Producto {
    id: string;
    descripcion: string;
    url: string;
    titulo: string;
    precio: number;
}
