import { firestore as db } from "../../config";
import { Order, Producto, Restaurante } from "../../models/models";
import { EstadoPedido } from "../../enums/EstadoPedido";

class FetchService {
  public static async fetchRestaurantsByLocalidad(
    localidad: string
  ): Promise<Restaurante[]> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("localidad", "==", localidad)
      .where("isDelete","==",false)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    return docs;
  }

  public static async fetchRestaurantByTitulo(
    titulo: string
  ): Promise<Restaurante> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("titulo", "==", titulo)
      .where("isDelete","==",false)
      .get();
    let docs: any[] = [];
    let docId: string = "";
    querySnapshot.forEach((doc) => {
      doc.data().id = doc.id;
      docId = doc.id;
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    let restaurante: Restaurante = docs.pop();
    restaurante.uid = docId;
    return restaurante;
  }

  public static async fetchMenuByRestaurantId(id: string): Promise<Producto[]> {
    const subCollection: string = "restaurants/" + id + "/menu";
    const querySnapshot = await db.collection(subCollection).where("isDelete","==",false).get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Producto);
    });
    return docs;
  }
  public static async fetchOrdersByRestaurant(
    restaurantName: string[]
  ): Promise<Order[]> {
    const querySnapshot = await db
      .collection("orders")
      .where("nombre_restaurante", "in", restaurantName) 
      .where("rechazado_restaurante", "==", false)
      .where("estado", "==", EstadoPedido.ESPERANDO)
      .get();
    let docs: any[] = [];
    let docId: string = "";
    debugger;
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      if (doc.exists) {
        let order: Order = doc.data() as Order;
        order.uid = docId;
        docs.push(order);
      }
    });
    return docs;
  }

  public static async fetchOrdersPendingOfShipments(
  ): Promise<Order[]> {
    const querySnapshot = await db
      .collection("orders") //POR AHORA TRAE DE TODOS - VER RELACION DE REPARTIDORES CON RESTAURANTES
      .where("rechazado_restaurante", "==", false)
      .where("estado", "in", [EstadoPedido.EN_CAMINO,EstadoPedido.PREPARANDO])
      .get();
    let docs: any[] = [];
    let docId: string = "";
    debugger;
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      if (doc.exists) {
        let order: Order = doc.data() as Order;
        order.uid = docId;
        docs.push(order);
      }
    });
    return docs;
  }
}

export default FetchService;
