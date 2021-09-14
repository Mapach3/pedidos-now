export interface Restaurante {
  id: string;
  descripcion: string;
  url: string;
  titulo: string;
  localidad: string;
}

export interface Producto {
  nombre: string;
  precio: number;
}

export interface ItemPedido {
  producto: Producto;
  cantidad: number;
}

export interface PedidoItems {
  items: ItemPedido[];
  restaurante: string;
}
