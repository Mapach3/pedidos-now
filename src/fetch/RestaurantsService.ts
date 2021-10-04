import { firestore as db } from "../config";
import { Restaurante } from "../models/models";

const restaurants = db.collection("restaurants");

export class RestaurantsService {
  static async getRestaurantByName(name: String) : Promise<Restaurante>{
    const querySnapshot = await restaurants.where("titulo", "==", name).where("isDelete","==",false).get();
    let docId: string = "";
    let restaurant: any 
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      if (doc.exists) {
        restaurant = doc.data() as Restaurante;
        restaurant.uid = docId;
      }
    });
    return restaurant;
  }

  public static async getRestaurantsByOwner(
    owner_id: string | null
  ): Promise<Restaurante[]> {
    const querySnapshot = await db
      .collection("restaurants")
      .where("dueño", "==", owner_id)
      .where("isDelete","==",false)
      .get();
    let docs: any[] = [];
    let restaurant: any 
    let docId: string = "";
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      if (doc.exists){
        restaurant = doc.data() as Restaurante;
        restaurant.uid = docId;
        docs.push(restaurant);
      } 
    });
    return docs;  
  }

  public static async deleteRestaurantByUid(uidRestaurant: string) {
    await restaurants.doc(uidRestaurant).update({
      isDelete: true,
    })
  }
}
