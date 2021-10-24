
export const agregarACarrito = (data) => dispach => {
   dispach({
       type:'agregarCarrito',
       payload:data
   })
}

export const eliminarItemDeCarrito = (posicion) => dispach => {
    dispach({type: 'eliminarItemDeCarrito', payload: posicion});
}


export const agregarNombre = (nombre) => dispach => {
    dispach({
        type:'agregarNombreSucursal',
        payload:nombre
    })
 }

 export const agregarDireccion = (direccion) => dispach => {
     dispach({type: 'agregarDireccionSucursal', payload: direccion})
 }
 
export const clearPedido = () => dispach => {
    dispach({
        type:'clearPedido',
    })
 }