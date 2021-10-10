import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FetchService from "../../functions/fetch/FetchService";
import { Order } from "../../models/models";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";
import { OrdersService } from "../../fetch/OrdersService";
import { RestaurantsService } from "../../fetch/RestaurantsService";

const OrdersTable: React.FC = () => {
  const [itemsPedidos, setItemPedido] = useState<Order[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let comercianteLogueado = localStorage.getItem("PedidosNow.UserId");
        let nombresRestaurantes: string[] = [];
        const responseResto = await RestaurantsService.getRestaurantsByOwner(
          comercianteLogueado
        );
        responseResto.forEach((item) => nombresRestaurantes.push(item.titulo));
        const response = await FetchService.fetchOrdersByRestaurant(
          nombresRestaurantes
        );
        setItemPedido(response);
      } catch (error: any) {}
    };
    fetchOrders();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const aceptarPedido = async (uid?: string) => {
    try {
      setIsSubmitting(true);
      await OrdersService.updateStateRestaurantPendingOrderCollection(
        false,
        true,
        uid
      );
      setDialogMessage("Pedido confirmado con éxito!");
      setOpenDialog(true);
    } catch (error: any) {
      setDialogMessage(
        "Lo sentimos, ocurrió un error al aceptar tu pedido. Por favor intenta nuevamente en unos minutos."
      );
      setOpenDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rechazarPedido = async (uid?: string) => {
    try {
      setIsSubmitting(true);
      await OrdersService.updateStateRestaurantPendingOrderCollection(
        true,
        false,
        uid
      );
      setDialogMessage("Pedido rechazado con éxito!");
      setOpenDialog(true);
    } catch (error: any) {
      setDialogMessage(
        "Lo sentimos, ocurrió un error al rechazar tu pedido. Por favor intenta nuevamente en unos minutos."
      );
      setOpenDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg" style={{ padding: "1rem" }}>
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
              <TableCell align="center">Nombre Restaurante</TableCell>
              <TableCell align="center">Telefono</TableCell>
              <TableCell align="center">Localidad</TableCell>
              <TableCell align="center">Direccion</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Metodo de Pago</TableCell>
              <TableCell align="center">Total</TableCell>

              <TableRow>
                <TableRow>
                  <TableCell align="center">Items de Producto</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center">Producto</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Precio</TableCell>
                </TableRow>
              </TableRow>

              <TableCell align="center">Aceptar Pedido</TableCell>
              <TableCell align="center">Rechazar Pedido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsPedidos.map((row) => (
              <TableRow key={row.nombre_restaurante}>
                <TableCell component="th" scope="row">
                  {" "}
                  {row.nombre_restaurante}
                </TableCell>
                <TableCell align="center">{row.telefono}</TableCell>
                <TableCell align="center">{row.localidad}</TableCell>
                <TableCell align="center">{row.direccion}</TableCell>
                <TableCell align="center">{row.estado}</TableCell>
                <TableCell align="center">{row.metodoPago}</TableCell>
                <TableCell align="center">{row.total}</TableCell>

                {row.items.map((prod) => (
                  <TableRow key={row.nombre_restaurante}>
                    <>
                      <TableCell align="center">{prod.producto}</TableCell>
                      <TableCell align="center">{prod.cantidad}</TableCell>
                      <TableCell align="center">{prod.precio}</TableCell>
                    </>
                  </TableRow>
                ))}

                <TableCell align="center">
                  {
                    <Button
                      disabled={isSubmitting}
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
                  }
                </TableCell>
                <TableCell align="center">
                  {
                    <Button
                      disabled={isSubmitting}
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
                  }
                </TableCell>
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
