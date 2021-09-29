import { firestore as db } from "../config";
import { Restaurante } from "../models/models";

const restaurants = db.collection("restaurants");

export class RestaurantsService {
  static async getRestaurantByName(name: String) {
    let restaurant = undefined;
    const querySnapshot = await restaurants.where("titulo", "==", name).get();
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        restaurant = doc.data();
      }
    });
    return restaurant;
  }

  public static async getRestaurantsByOwner(
    owner_id: string
  ): Promise<Restaurante[]> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("dueño", "==", owner_id)
      .get();
    let docs: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) docs.push(doc.data() as Restaurante);
    });
    return docs;
  }
}
