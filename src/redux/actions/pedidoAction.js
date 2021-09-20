
export const agregarACarrito = (data) => dispach => {
   dispach({
       type:'agregarCarrito',
       payload:data
   })
}


export const agregarNombre = (nombre) => dispach => {
    console.log(nombre);
    dispach({
        type:'agregarNombreSucursal',
        payload:nombre
    })
 }
 