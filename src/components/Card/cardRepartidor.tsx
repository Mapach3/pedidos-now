import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { ItemPedidoOrder, Producto } from "../../models/models";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: 20,
    padding: 15,
    cursor: "pointer",
    justifyContent: "center",
  },
  media: {
    borderRadius: "10%",
    border: "0.5px solid",
    width: "8rem",
    height: "8rem",
  },
  contend: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface props {
  open: boolean;
  handleClose: any;
  pedidoDetail: ItemPedidoOrder[];
}

export default function ItemCard({ open, handleClose, pedidoDetail }: props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Detalle de Pedido"}</DialogTitle>
        <DialogContent>
          <Card className={classes.root} variant="outlined">
            <CardMedia
              component="img"
              height="140"
              image="https://images.deliveryhero.io/image/pedidosya/home-backgrounds/home-background-ar.jpg?quality=100&width=1345"
            />
            <CardContent>
              {pedidoDetail.map((producto) => (
                <>
                  <Typography gutterBottom variant="h5" component="div">
                    {producto.producto}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cantidad: {producto.cantidad} Precio: ${producto.precio}
                  </Typography>
                </>
              ))}
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                style={{
                  marginLeft: "1rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
                variant="contained"
                onClick={() => handleClose()}
              >
                Cerrar
              </Button>
            </CardActions>
          </Card>
        </DialogContent>
        {/* <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions> */}
      </Dialog>
    </div>
  );
}
