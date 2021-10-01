import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MenuItem, Select, Typography } from "@material-ui/core";
import useStyles from "../../styles/styles";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();
  const history = useHistory();

  const pedidosPendientes = (e: any) => {
    e.preventDefault();
    history.push(`/restaurants/orders/pendings`);
  };

  const altaComercio = (e: any) => {
    history.push(ClientRoutes.RESTAURANT_CREATE);
    //Push vista
  };

  const modificarComercio = (e: any) => {
    e.preventDefault();
    //Push vista
  };

  const bajaComercio = (e: any) => {
    e.preventDefault();
    //Push vista
  };

  const altaProducto = (e: any) => {
    history.push(ClientRoutes.PRODUCT_CREATE);
    //Push vista
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeSearch}>
        <div style={{ display: "flex" }}>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={pedidosPendientes}
          >
            Ver Pedidos Pendientes
          </Button>

          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={altaComercio}
          >
            Dar de Alta un Comercio
          </Button>

          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={modificarComercio}
          >
            Modificar Informacion de Comercio
          </Button>

          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={bajaComercio}
          >
            Dar de Baja un Comercio
          </Button>

          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={altaProducto}
          >
            Dar de Alta un Producto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
