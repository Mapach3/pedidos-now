import { firestore as db } from "../../config";
import { Restaurante } from "../../models/models";

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
}

export default FetchService;
