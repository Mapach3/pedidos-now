import {
  Dialog,
  DialogTitle,
  DialogActions,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { RestaurantsService } from "../../fetch/RestaurantsService";
import { Restaurante } from "../../models/models";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";

const RestaurantDelete: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      let comercianteLogueado = localStorage.getItem("PedidosNow.UserId");
      const responseResto = await RestaurantsService.getRestaurantsByOwner(comercianteLogueado);
      setRestaurantes(responseResto);
    };
    fetchRestaurants();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const eliminarRestaurante = async (uid?: string) => {
    try {
      setIsSubmitting(true);
      if(uid){
        await RestaurantsService.deleteRestaurantByUid(uid);
        setDialogMessage("Restaurante eliminado con éxito!");
      }else{
        setDialogMessage("Lo sentimos, ocurrió un error al eliminar tu restaurante. Por favor intenta nuevamente en unos minutos.");
      }
      setOpenDialog(true);
    } catch (error: any) {
      setDialogMessage(
        "Lo sentimos, ocurrió un error al eliminar tu restaurante. Por favor intenta nuevamente en unos minutos."
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
      Restaurantes
    </Typography>
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre Restaurante</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Localidad</TableCell>
            <TableCell align="center">Precio de Envio</TableCell>

            <TableCell align="center">Eliminar Restaurante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((row) => (
            <TableRow key={row.titulo}>
              <TableCell component="th" scope="row">
                {" "}
                {row.titulo}
              </TableCell>
              <TableCell align="center">{row.descripcion}</TableCell>
              <TableCell align="center">{row.localidad}</TableCell>
              <TableCell align="center">{row.precioEnvio}</TableCell>

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
                    onClick={() => eliminarRestaurante(row.uid)}
                  >
                    Eliminar
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

export default RestaurantDelete;
