export enum EstadoPedido {
  ESPERANDO = "ESPERANDO",
  PREPARANDO = "PREPARANDO",
  EN_CAMINO = "EN_CAMINO",
  RECIBIDO = "RECIBIDO",
}

export const EstadoPedidoLabels = {
  [EstadoPedido.ESPERANDO]: "Esperando",
  [EstadoPedido.PREPARANDO]: "Preparando",
  [EstadoPedido.EN_CAMINO]: "En camino",
  [EstadoPedido.RECIBIDO]: "Recibido",
};
