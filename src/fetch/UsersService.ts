import { firestore as db } from "../config";

const users = db.collection("users");

export class UsersService {
  static async fetchUserByEmail(email: string) {
    const query = await users.where("email", "==", email).get();

    if (!query.empty) {
      return query.docs[0];
    }
    return undefined;
  }

  static async emailAlreadyExists(email: string) {
    const result = await UsersService.fetchUserByEmail(email);
    return result !== undefined;
  }
}
