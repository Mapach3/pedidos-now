import app, { firestore as db } from "../config";
import { Order } from "../models/models";

const orders = db.collection("orders");

export class OrdersService {
  static async postOrderToCollection(order: Order) {
    await orders.doc().set(order);
  }
}
