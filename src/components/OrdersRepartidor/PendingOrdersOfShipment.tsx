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
import { Order, Producto } from "../../models/models";
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
import { EstadoPedido } from "../../enums/EstadoPedido";
import ItemCard from "../../components/Card/cardRepartidor";

const PendingOrdersOfShipment: React.FC = () => {
  const [itemsPedidos, setItemPedido] = useState<Order[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [selectedPedidoDetail, setSelectedPedidoDetail] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await FetchService.fetchOrdersPendingOfShipments();
      setItemPedido(response);
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

  const actualizarEstado = async (estado: EstadoPedido, uid?: string) => {
    try {
      setIsSubmitting(true);
      await OrdersService.updatePendingOrderOfShipment(estado, uid);
      setDialogMessage("Pedido actualizado con éxito!");
      setOpenDialog(true);
    } catch (error: any) {
      setDialogMessage(
        "Lo sentimos, ocurrió un error al actualizar tu pedido. Por favor intenta nuevamente en unos minutos."
      );
      setOpenDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const verDetallePedido = (itemsPedido: any) => {
    setSelectedPedidoDetail(itemsPedido);
    setOpenCard(true);
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

              <TableCell align="center">Detalle de Productos</TableCell>

              <TableCell align="center">Aceptar Pedido</TableCell>
              <TableCell align="center">Confirmar Recepcion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsPedidos.map((row) => (
              <TableRow key={row.nombre_restaurante}>
                <TableCell component="th" scope="row">
                  {row.nombre_restaurante}
                </TableCell>
                <TableCell align="center">{row.telefono}</TableCell>
                <TableCell align="center">{row.localidad}</TableCell>
                <TableCell align="center">{row.direccion}</TableCell>
                <TableCell align="center">{row.estado}</TableCell>
                <TableCell align="center">{row.metodoPago}</TableCell>
                <TableCell align="center">${row.total}</TableCell>
                <TableCell align="center">
                  <Button
                    disabled={isSubmitting}
                    color="secondary"
                    style={{
                      marginLeft: "1rem",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}
                    variant="contained"
                    onClick={() => verDetallePedido(row.items)}
                  >
                    Ver Detalle
                  </Button>
                </TableCell>

                <TableCell align="center">
                  {
                    <Button
                      disabled={
                        row.estado === EstadoPedido.EN_CAMINO || isSubmitting
                          ? true
                          : false
                      }
                      color="secondary"
                      style={{
                        marginLeft: "1rem",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                      }}
                      variant="contained"
                      onClick={() =>
                        actualizarEstado(EstadoPedido.EN_CAMINO, row.uid)
                      }
                    >
                      En camino
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
                      onClick={() =>
                        actualizarEstado(EstadoPedido.RECIBIDO, row.uid)
                      }
                    >
                      Recibido
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPedidoDetail && (
        <ItemCard
          open={openCard}
          handleClose={() => setOpenCard(false)}
          pedidoDetail={selectedPedidoDetail}
        />
      )}

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
              onClick={() => history.push(ClientRoutes.HOME_REPARTIDOR)}
            >
              Volver a la home
            </Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </Container>
  );
};
export default PendingOrdersOfShipment;
