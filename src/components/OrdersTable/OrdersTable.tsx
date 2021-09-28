import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FetchService from '../../functions/fetch/FetchService';
import { Order } from '../../models/models';
import { Dialog, DialogTitle, DialogActions, Container, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";
import { OrdersService } from "../../fetch/OrdersService";
import DataTable from '../../components/Table/Table';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const OrdersTable: React.FC = () => {
    const [itemsPedidos, setItemPedido] = useState<Order[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            //Dejo puesto un nombre de un restaurant para probar el flujo - Reemplazar por owner id en vez de nombre restaurante cuando este la relacion con el usuario
          const response = await FetchService.fetchOrdersByRestaurant('Mc Donalds Lomas');
          console.log({ response });
          setItemPedido(response);
        };
        fetchOrders();
      }, ['Mc Donalds Lomas']);
      
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const classes = useStyles();
const history = useHistory();

const aceptarPedido = async (uid?: string) => {
  try {
    await OrdersService.updateStateRestaurantPendingOrderCollection(false,true,uid);
    setDialogMessage(
      "Pedido confirmado con éxito!"
    );
    setOpenDialog(true);
  } catch (error: any) {
    setDialogMessage(
      "Lo sentimos, ocurrió un error al aceptar tu pedido. Por favor intenta nuevamente en unos minutos."
    );
    setOpenDialog(true);
  } finally {
  }
};

const rechazarPedido = async (uid?: string) => {
  try {
    await OrdersService.updateStateRestaurantPendingOrderCollection(true,false,uid);
    setDialogMessage(
      "Pedido rechazado con éxito!"
    );
    setOpenDialog(true);
  } catch (error: any) {
    setDialogMessage(
      "Lo sentimos, ocurrió un error al rechazar tu pedido. Por favor intenta nuevamente en unos minutos."
    );
    setOpenDialog(true);
  } finally {
  }
};

// const columns: GridColDef[] = [
//     {field: 'user_id', headerName: 'User Id', width: 150 },
//     {field: 'items', headerName: 'Items',  width: 150,},
//     {field: 'total', headerName: 'Total', type: 'number', width: 150 },
//     {field: 'nombre_restaurante', headerName: 'Nombre Restaurante', width: 230 },
//     {field: 'telefono', headerName: 'Telefono',  width: 150,},
//     {field: 'localidad', headerName: 'Localidad',  width: 150,},
//     {field: 'direccion', headerName: 'Direccion',  width: 150,},
//     {field: 'estado', headerName: 'Estado',  width: 150,},
//     {field: 'metodoPago', headerName: 'Metodo de Pago',  width: 200,},
//     {field: 'rechazado_restaurante', headerName: 'Rechazado', type: 'boolean', width: 230,},
//     // {field: 'items', headerName: 'Items', description: 'Items Pedido', sortable: false, width: 160,
//     //   valueGetter: (params: GridValueGetterParams) =>
//     //     `${params.getValue(params.producto, 'producto') || ''} 
//     //     ${ params.getValue(params.cantidad, 'cantidad') || ''} 
//     //     ${params.getValue(params.precio, 'precio') || ''}`,
//     // },
//   ];
  
//   const rows = [
//     { id: 1 ,user_id: 'a', items: 'Snow', total: 12, nombre_restaurante: 'asas' }
//   ];

//REVISAR TABLAS CUAL USAR Y ESTILOS
  return (
    <Container component="main" maxWidth="md" style={{ padding: "1rem" }}>
      <Typography
      variant="h6"
      style={{
        textAlign: "center",
        paddingBottom: "1rem",
      }}
    >
      Pedidos
    </Typography>
    
      {/* <DataTable
        rows = {itemsPedidos}
        columns = {columns}     
      /> */}


    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Restaurante</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="right">Localidad</TableCell>
            <TableCell align="right">Direccion</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Metodo de Pago</TableCell>
            <TableCell align="right">Total</TableCell>
              <TableRow>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio</TableCell>
              </TableRow>
            <TableCell align="right">Aceptar Pedido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsPedidos.map((row) => (
            <TableRow key={row.nombre_restaurante}>
              <TableCell component="th" scope="row"> {row.nombre_restaurante}</TableCell>
              <TableCell align="right">{row.telefono}</TableCell>
              <TableCell align="right">{row.localidad}</TableCell>
              <TableCell align="right">{row.direccion}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
              <TableCell align="right">{row.metodoPago}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              {row.items.map((prod) => (
                 <TableRow key={row.nombre_restaurante}>
                  <TableCell align="center">{prod.producto}</TableCell>
                  <TableCell align="center">{prod.cantidad}</TableCell>
                  <TableCell align="center">{prod.precio}</TableCell>
                </TableRow>
              ))}
              <TableCell align="right">{
                     <Button
                     color="secondary"
                     style={{
                       marginLeft: "1rem",
                       paddingTop: "1rem",
                       paddingBottom: "1rem",
                     }}
                     variant="contained"
                     onClick={() => aceptarPedido(row.uid)}
                   >
                     Aceptar
                   </Button>               
              }</TableCell>
              <TableCell align="right">{
                    <Button
                    color="secondary"
                    style={{
                      marginLeft: "1rem",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}
                    variant="contained"
                    onClick={() => rechazarPedido(row.uid)}
                    >
                    Rechazar
                    </Button>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={setOpenDialog}
        open={openDialog}
      >
        <DialogTitle id="alert-dialog-title">
          {dialogMessage}
          <DialogActions>
            <Button
              variant="contained"
              style={{ marginRight: "7rem", marginTop: "1rem" }}
              color="secondary"
              onClick={() => history.push(ClientRoutes.HOME_COMERCIANTE)}
            >
              Volver a la home
            </Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </Container>
  );
 
};
export default OrdersTable;