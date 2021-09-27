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
import { ItemPedido } from '../../models/models';
import { Container, Typography } from '@material-ui/core';

const OrdersTable: React.FC = () => {
    const [itemsPedidos, setItemPedido] = useState<ItemPedido[]>([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            //Dejo puesto un nombre de un restaurant para probar el flujo
          const response = await FetchService.fetchOrdersByRestaurant('Mc Donalds Lomas');
          console.log({ response });
          setItemPedido(response.flatMap(pedido => pedido.items));
        };
        fetchOrders();
      }, ['Mc Donalds Lomas']);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(productName: string, cantidad: number, precio: number) {
  return { productName, cantidad, precio};
}


const classes = useStyles();

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsPedidos.map((row) => (
            <TableRow key={row.producto.id}>
              <TableCell component="th" scope="row">
                {row.producto}
              </TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );



};
export default OrdersTable;