let initialState = {
    infoPedido:[],
    nombreRestaurante:'',
}

function reducer (store=initialState, action:any){
        switch (action.type){

            case 'agregarCarrito':
                if(!action.payload){
                    return null
                }
                return {...store,infoPedido:[...store.infoPedido,action.payload]} 
            case 'agregarNombreSucursal':
                if(!action.payload){
                    return null
                }
                return {...store,nombreRestaurante:action.payload} 
            default:
                return store;    
        }
}

export default reducer ;