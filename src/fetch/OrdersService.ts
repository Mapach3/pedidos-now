import { firestore as db } from "../config";
import { Order } from "../models/models";
import {EstadoPedido} from "../enums/EstadoPedido";

const orders = db.collection("orders");

export class OrdersService {
  static async postOrderToCollection(order: Order,) {
    await orders.doc().set(order);
  }

  static async updateStateRestaurantPendingOrderCollection(rechazado_restaurante:boolean,aceptar_pedido:boolean,uid?: string) {  
    if(aceptar_pedido){
      await orders.doc(uid).update({
        estado: EstadoPedido.PREPARANDO,
        rechazado_restaurante: rechazado_restaurante
      })
    }else{
      await orders.doc(uid).update({
        rechazado_restaurante: rechazado_restaurante
      })
    }
  }

  static async updatePendingOrderOfShipment(estado:EstadoPedido,uid?: string) {  
      await orders.doc(uid).update({
        estado: estado,
      })
  }
}
