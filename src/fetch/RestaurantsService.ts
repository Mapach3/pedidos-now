import { firestore as db } from "../config";

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
}
