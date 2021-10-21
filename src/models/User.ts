import { Direccion } from "./models";

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
  cuit?: string;
  uid: string;
  docId?: string;
  direcciones?: Direccion[];
}
