export interface Restaurante {
  id: string;
  uid: string;
  descripcion: string;
  url: string;
  titulo: string;
  localidad: string;
  menu: Producto[];
}

export interface ItemPedido {
  producto: Producto;
  cantidad: number;
  precio:number;
}

export interface PedidoItems {
  items: ItemPedido[];
  restaurante: string;
}

export interface Producto {
    id: string;
    descripcion: string;
    url: string;
    titulo: string;
    precio: number;
}

export interface Order {
  user_id: string | null;
  items: PedidoItems;
  total: number;
}
