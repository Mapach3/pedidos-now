
export const agregarACarrito = (data) => dispach => {
   dispach({
       type:'agregarCarrito',
       payload:data
   })
}
