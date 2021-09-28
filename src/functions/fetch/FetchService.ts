import { firestore as db } from "../../config";
import { Order, Producto, Restaurante } from "../../models/models";

class FetchService {
  public static async fetchRestaurantsByLocalidad(
    localidad: string
  ): Promise<Restaurante[]> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("localidad", "==", localidad)
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
      .where("titulo","==",titulo)
      .get();
    let docs: any[] = [];
    let docId:string='';
    querySnapshot.forEach((doc) => {
      doc.data().id = doc.id;
      docId = doc.id;
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    let restaurante: Restaurante = docs.pop();
    restaurante.uid= docId;
    return restaurante;
  }

  public static async fetchMenuByRestaurantId(
    id: string
  ): Promise<Producto[]> {
    const subCollection: string = "restaurants/" + id + "/menu"
    const querySnapshot = await db
      .collection(subCollection)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Producto);
    });
    return docs;
  }
  public static async fetchOrdersByRestaurant(
    restaurantName: string
  ): Promise<Order[]> {
    const querySnapshot = await db
      .collection("orders")
      .where("nombre_restaurante", "==", restaurantName)
      .where("rechazado_restaurante","==", false)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Order);
    });
    return docs;
  }
}

export default FetchService;
