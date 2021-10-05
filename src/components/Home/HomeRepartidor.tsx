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

  const pedidosPendientesDeEnvio = (e: any) => {
    history.push(ClientRoutes.ORDERS_LIST_DISTRIBUTOR);
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
            onClick={pedidosPendientesDeEnvio}
          >
            Ver Pedidos Pendientes de Envio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
