export enum PaymentMethods {
  EFECTIVO = "EFECTIVO",
  TARJETA = "TARJETA",
}

export const PaymentMethodsLabels = {
  [PaymentMethods.EFECTIVO]: "Efectivo",
  [PaymentMethods.TARJETA]: "Tarjeta (Temporalmente no disponible)",
};
