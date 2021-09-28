import { firestore as db } from "../config";
import { Order } from "../models/models";

const orders = db.collection("orders");

export class OrdersService {
  static async postOrderToCollection(order: Order,) {
    await orders.doc().set(order);
  }

  static async updateStateRestaurantPendingOrderCollection(userId: string | null ,rechazado_restaurante:boolean) {
    const querySnapshot = await orders.where("user_id", "==", userId).get(); //DEBERIA SER POR ID - AGREGAR ID A LA ORDEN - REVISAR CON GUIDO
    let docs
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs = doc.id;
    });
    //docs.map(item => item.rechazado_restaurante = rechazado_restaurante)
    await orders.doc(docs).update({
      rechazado_restaurante: rechazado_restaurante
    })
  }
}
