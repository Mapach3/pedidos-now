import {
  Button,
  CircularProgress,
  Container,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../config";
import { ClientRoutes } from "../../config/enums";
import { UserTypes, UserTypesEnumLabels } from "../../enums/UserTypes";
import { UsersService } from "../../fetch/UsersService";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(UserTypes.CLIENTE);
  const [cuit, setCuit] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ nombre, apellido, email, contraseña, tipoUsuario, cuit });
    try {
      setIsSubmitting(true);

      await auth.createUserWithEmailAndPassword(email, contraseña);
      const uid = auth.currentUser!.uid;

      await UsersService.postUserToCollection({
        nombre,
        apellido,
        email,
        tipo: tipoUsuario,
        cuit,
        uid,
      });

      const currentUser = auth.currentUser;
      localStorage.setItem(
        "PedidosNow.JWT",
        (await currentUser?.getIdToken()) || ""
      );
      localStorage.setItem("PedidosNow.UserType", tipoUsuario);
      localStorage.setItem("PedidosNow.Nombre", nombre);
      localStorage.setItem("PedidosNow.Apellido", apellido);
      localStorage.setItem("PedidosNow.UserId", uid);

      setOpen(true);
      setTimeout(() => {
        if (tipoUsuario === UserTypes.COMERCIANTE) {
          history.push(ClientRoutes.HOME_COMERCIANTE);
        }

        if (tipoUsuario === UserTypes.REPARTIDOR) {
          history.push(ClientRoutes.HOME_REPARTIDOR);
        }

        if (tipoUsuario === UserTypes.CLIENTE) {
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
    <Container component="main" maxWidth="sm" style={{ padding: "1rem" }}>
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        ¡Registrate para disfrutar de los mejores productos!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(event) => setNombre(event.target.value)}
          id="nombre"
          label="Nombre"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setApellido(event.target.value)}
          id="apellido"
          label="Apellido"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
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
        <Select
          label="Tipo de usuario"
          onChange={(event: React.ChangeEvent<any>) =>
            setTipoUsuario(event.target.value)
          }
          required
          variant="outlined"
          style={{ width: "100%" }}
          labelId="userType"
          value={tipoUsuario}
          defaultValue={tipoUsuario}
        >
          {Object.values(UserTypes).map((item) => (
            <MenuItem key={item} value={UserTypes[item]}>
              {UserTypesEnumLabels[item]}
            </MenuItem>
          ))}
        </Select>
        {tipoUsuario === UserTypes.COMERCIANTE && (
          <TextField
            type="number"
            onChange={(event) => setCuit(event.target.value)}
            label="Cuit"
            variant="outlined"
            required
            style={{ width: "100%", marginTop: "1rem" }}
          />
        )}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "40%" }}
          >
            Enviar
            {isSubmitting && (
              <CircularProgress
                size="1.2rem"
                style={{ marginLeft: "1.1rem" }}
              />
            )}
          </Button>
        </div>
        <Typography style={{ textAlign: "center", paddingTop: "15px" }}>
          Ya tenes una cuenta? <Link href={ClientRoutes.LOGIN}>Ingresar</Link>
        </Typography>
      </form>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert color="success" severity="success" variant="filled">
          ¡Te registraste correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
