import app, { firestore as db, auth } from "../config";
import { User } from "../models/User";

const users = db.collection("users");

export class UsersService {
  static async fetchUserByEmail(email: string) {
    const query = await users.where("email", "==", email).get();

    if (!query.empty) {
      return query.docs[0];
    }
    return undefined;
  }

  static async fetchUserById(id: string): Promise<User>{
    const querySnapshot = await users.where("uid","==",id).get();
    let docs: any[] = [];
    let user: User 
    let docId: string = "";
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      if (doc.exists){
        user = doc.data() as User;
        user.docId = docId;
        docs.push(user);
      } 
    });
    return docs[0];  
  }

  static async updateUserToCollection(docId: string, nombre: string, apellido: string, cuit: string, email:string, updateEmail:boolean, emailActual:string,contraseñaActual:string) {
    if(updateEmail){
      let response = await auth.signInWithEmailAndPassword(emailActual,contraseñaActual);
      response.user?.updateEmail(email);
      let user = response.user
      auth.updateCurrentUser(user);
    }
    await users.doc(docId).update({
      nombre: nombre,
      apellido: apellido,
      cuit: cuit,
      email: email
    })
  }

  static async emailAlreadyExists(email: string) {
    const result = await UsersService.fetchUserByEmail(email);
    return result !== undefined;
  }

  static async postUserToCollection(user: User) {
    await users.doc().set(user);
  }

  static async signOutUser() {
    await app.auth().signOut();
    localStorage.removeItem("PedidosNow.JWT");
    localStorage.removeItem("PedidosNow.UserType");
    localStorage.removeItem("PedidosNow.Nombre");
    localStorage.removeItem("PedidosNow.Apellido");
    localStorage.removeItem("PedidosNow.UserId");
  }
}
