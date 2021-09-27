import { GlobalState } from "../types";

let initialState: GlobalState = {
  infoPedido: [],
  nombreRestaurante: "",
};

function reducer(store = initialState, action: any) {
  console.log(action.type)

  switch (action.type) {
    case "agregarCarrito":
      if (!action.payload) {
        return null;
      }
      return { ...store, infoPedido: [...store.infoPedido, action.payload] };
    case "agregarNombreSucursal":
      if (!action.payload) {
        return null;
      }
      return { ...store, nombreRestaurante: action.payload };

    case "eliminarItemDeCarrito":
      if (!action.payload) {
        return null;
      }
      return {
        ...store,
        infoPedido: store.infoPedido.filter(
          (item) => item.posicionCarrito !== action.payload
        ),
      };
    case "clearPedido": 
      console.log('action')
      return {
        ...store,
        infoPedido:[],
        nombreRestaurante:''
      }
    default:
      return store;
  }
}

export default reducer;
