export interface InfoPedidoItem {
  cantidad: number;
  precio: number;
  producto: string;
  posicionCarrito: number;
}

export interface GlobalState {
  infoPedido: InfoPedidoItem[];
  nombreRestaurante: string;
  direccionRestaurante: string;
}
