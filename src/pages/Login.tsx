import {
  Button,
  CircularProgress,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../config";
import { ClientRoutes } from "../config/enums";
import { UsersService } from "../fetch/UsersService";
import Layout from "../layout/Layout";
import { User } from "../models/User";
import { UserTypes } from "../enums/UserTypes";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        contraseña
      );
      const loggedInUser = userCredential.user;

      const user = (
        await UsersService.fetchUserByEmail(loggedInUser?.email!)
      )?.data() as User;

      localStorage.setItem(
        "PedidosNow.JWT",
        (await loggedInUser?.getIdToken()) || ""
      );
      localStorage.setItem("PedidosNow.UserType", user.tipo);
      localStorage.setItem("PedidosNow.Nombre", user.nombre);
      localStorage.setItem("PedidosNow.Apellido", user.apellido);
      localStorage.setItem(
        "PedidosNow.Direcciones",
        user.direcciones ? JSON.stringify(user.direcciones) : ""
      );
      localStorage.setItem("PedidosNow.UserId", auth.currentUser?.uid || "");

      setOpen(true);
      setTimeout(() => {
        if (user.tipo === UserTypes.COMERCIANTE) {
          history.push(ClientRoutes.HOME_COMERCIANTE);
        }

        if (user.tipo === UserTypes.REPARTIDOR) {
          history.push(ClientRoutes.HOME_REPARTIDOR);
        }

        if (user.tipo === UserTypes.CLIENTE) {
          history.push(ClientRoutes.HOME);
        }
      }, 3000);
    } catch (error: any) {
      alert("Error: " + error.code + ": " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xs"
        style={{ padding: "1rem 0 10rem 0" }}
      >
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            paddingBottom: "1rem",
          }}
        >
          Ingresa al sitio con tu cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            type="email"
            variant="outlined"
            required
            style={{ width: "100%", paddingBottom: "1rem" }}
          />
          <TextField
            onChange={(event) => setContraseña(event.target.value)}
            label="Contraseña"
            type="password"
            variant="outlined"
            required
            style={{ width: "100%", paddingBottom: "1rem" }}
          />
          <div style={{ textAlign: "center" }}>
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="secondary"
              type="submit"
              style={{ width: "40%" }}
            >
              Ingresar
              {isSubmitting && (
                <CircularProgress
                  size="1.2rem"
                  style={{ marginLeft: "1.1rem" }}
                />
              )}
            </Button>
          </div>
        </form>
        <Typography style={{ textAlign: "center", paddingTop: "15px" }}>
          <Link href={ClientRoutes.REGISTER}>No tengo una cuenta</Link>
        </Typography>
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert color="success" severity="success" variant="filled">
            ¡Ingresaste correctamente! Serás redirigido a la pantalla principal
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default Login;
