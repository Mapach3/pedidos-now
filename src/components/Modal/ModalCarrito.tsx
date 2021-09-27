import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarACarrito,
  agregarNombre,
} from "../../redux/actions/pedidoAction";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 30,
  },
  button: {
    marginTop: 30,
  },
}));

export const ModalCarrito = (props: any) => {
  const [cantidad, setCantidad] = useState("1");
  const { handleClose, open, producto, precio, nombreSucursal } = props;
  const dispath = useDispatch();
  const classes = useStyles();
  const itemsPedido = useSelector((state: any) => state.infoPedido);

  const agregarCarrito = () => {
    dispath(
      agregarACarrito({
        producto: producto,
        cantidad: cantidad,
        precio: precio,
        posicionCarrito: itemsPedido.infoPedido.length + 1,
      })
    );
    dispath(agregarNombre(nombreSucursal));
    handleClose();
  };

  const onChangeCantidad = (e: any) => {
    setCantidad(e.target.value);
  };

  return (
    <Dialog fullWidth maxWidth={"xs"} onClose={handleClose} open={open}>
      <Grid className={classes.root}>
        <Grid container justifyContent="center">
          <DialogTitle id="simple-dialog-title">Agregar a carrito</DialogTitle>
        </Grid>
        <Grid container direction="row">
          <Grid container xs={6} justifyContent="flex-start">
            <Typography>{producto}</Typography>
          </Grid>
          <Grid container xs={5} justifyContent="flex-end">
            <strong>{`$${precio}`}</strong>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid container xs={8} justifyContent="flex-start">
            <Typography>cantidad:</Typography>{" "}
          </Grid>
          <Grid container xs={3}>
            <TextField
              type="number"
              name="cantidad"
              onChange={onChangeCantidad}
              value={cantidad}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button
            color="primary"
            onClick={agregarCarrito}
            className={classes.button}
          >
            Agregar Producto
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
