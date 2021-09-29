import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { ClientRoutes } from "../config/enums";
import { UsersService } from "../fetch/UsersService";
import Layout from "../layout/Layout";

const Logout: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        await UsersService.signOutUser();
        setLogoutSuccess(true);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    logout();
  });

  const isLoggedIn = !!localStorage.getItem("PedidosNow.JWT");

  if (!isLoggedIn) {
    return <Redirect to={ClientRoutes.LOGIN} />;
  }

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xs"
        style={{ padding: "1rem 0 10rem 0", textAlign: "center" }}
      >
        {logoutSuccess && (
          <>
            <Typography>Tu sesión se cerró correctamente</Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
              onClick={() => history.push(ClientRoutes.HOME)}
            >
              Ir a la pantalla principal
            </Button>
          </>
        )}
        {isLoading && (
          <div style={{ display: "block" }}>
            <Typography>Cerrando sesión...</Typography>
            <CircularProgress />
          </div>
        )}
        {error && <Typography>Hubo un error: {error}</Typography>}
      </Container>
    </Layout>
  );
};
export default Logout;
