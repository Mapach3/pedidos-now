import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { ModalCarrito } from "../Modal/ModalCarrito";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  url: string;
  titulo: string;
  descripcion: string;
  verMenu?: any;
  precio: number;
}

export default function ItemCard({
  url,
  titulo,
  descripcion,
  verMenu,
  precio,
}: props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false); 


  const openModalSeleccion =  () => {
    setOpen(true);
  }

  return (
    <div>
      <ModalCarrito key={url} producto={titulo} precio={precio} handleClose={()=>setOpen(false)} open={open}/>

    <Card
      onClick={
        verMenu
          ? (e) => {
              verMenu(e, titulo);
            }
          : openModalSeleccion
      }
      className={classes.root}
      variant="outlined"
    >
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={4} justify="flex-start">
          <img className={classes.media} src={url} alt="No hay foto" />
        </Grid>

        <Grid container item xs={6} justify="center">
          <CardContent className={classes.contend}>
            <Typography style={{ fontWeight: "bold" }}>{titulo}</Typography>
            <Typography>{descripcion}</Typography>
            {precio && <Typography>Precio: ${precio}</Typography>}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
    </div>

  );
}
