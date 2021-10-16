export interface Restaurante {
  id?: string;
  uid?: string;
  descripcion: string;
  url: string;
  titulo: string;
  localidad: string;
  menu: Producto[];
  precioEnvio: string;
  dueño: string;
  isDelete: boolean;
}

export interface Direccion {
  direccion: string;
  latitud: number;
  longitud: number;
}

export interface ItemPedidoOrder {
  producto: string;
  cantidad: number;
  precio: number;
}

export interface ItemPedido {
  producto: Producto;
  cantidad: number;
  precio: number;
}

export interface PedidoItems {
  items: ItemPedido[];
  restaurante: string;
}

export interface Producto {
  descripcion: string;
  url: string;
  titulo: string;
  precio: string;
}

export interface Order {
  uid?: string;
  user_id: string | null;
  items: ItemPedido[];
  total: number;
  nombre_restaurante: string;
  telefono: string;
  localidad: string;
  direccion: string;
  estado: string;
  metodoPago: string;
  rechazado_restaurante: boolean;
}
