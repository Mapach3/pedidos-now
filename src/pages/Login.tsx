import {
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, contraseña });
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
              variant="contained"
              color="secondary"
              type="submit"
              style={{ width: "40%" }}
            >
              Ingresar
            </Button>
          </div>
        </form>
        <Typography style={{ textAlign: "center", paddingTop: "15px" }}>
          <Link href={ClientRoutes.REGISTER}>No tengo una cuenta</Link>
        </Typography>
      </Container>
    </Layout>
  );
};

export default Login;
