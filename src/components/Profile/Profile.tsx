import {
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
  Checkbox,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useState } from "react";
import { useEffect } from "react";
import useStyles from "../../styles/styles";
import { Alert } from "@material-ui/lab";
import { UsersService } from "../../fetch/UsersService";
import { UserTypes } from "../../enums/UserTypes";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";

const Profile: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");
  //State para modificacion de perfil://
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cuit, setCuit] = useState("");
  const [docId, setDocId] = useState("");
  const [tipoUser, setTipoUser] = useState<any>();
  const [disabledMail, setDisabledMail] = useState(true);
  const [showInputMailAndContraseña, setShowInputMailAndContraseña] = useState(false);
  const [emailActual, setEmailActual] = useState("");
  const [contraseña, setContraseña] = useState("");
  //State para cambio de contraseña://
  const [contraseñaActualChange, setContraseñaActualChange] = useState("");
  const [contraseñaNuevaChange, setContraseñaNuevaChange] = useState("");
  const [emailActualChangePass, setEmailActualChangePass] = useState("");
  //State para baja de cuenta://
  const [contraseñaActualBaja, setContraseñaActualBaja] = useState("");
  const [emailActualBaja, setEmailActualBaja] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      let userId: string = localStorage.getItem("PedidosNow.UserId") as string;
      let tipo: string = localStorage.getItem("PedidosNow.UserType") as string;
      setTipoUser(tipo);
      const response = await UsersService.fetchUserById(userId);
      setApellido(response.apellido);
      setNombre(response.nombre);
      setEmail(response.email);
      setCuit(response.cuit ?? "");
      setDocId(response.docId ?? "");
      setEmailActual(response.email);
      setEmailActualChangePass(response.email)
    };
    fetchUser();
  }, []);

  const handleChange = (checked:boolean) => {
    setDisabledMail(checked);
    setShowInputMailAndContraseña(checked == true ? false : true) 
    if(checked){
      setEmail(emailActual);
      setContraseña("");
    }
  };

  const modificarDatosPerfil = async () => {
    setIsUploading(true);
    try {
      if (apellido && nombre && ((cuit == "" && tipoUser != UserTypes.COMERCIANTE) || (cuit != "" && tipoUser == UserTypes.COMERCIANTE)) 
              && email && docId && ((disabledMail == false && contraseña != "") || (contraseña == "" && disabledMail == true))) {
        await UsersService.updateUserToCollection(docId,nombre, apellido, cuit, email, disabledMail == true ? false : true, emailActual, contraseña)

        setResultado("Datos modificados con éxito");
        setSuccess(true);
      } else {
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo modificar los datos de perfil");
    } finally {
      setIsUploading(false);
    }
  };

  const modificarClave = async () => {
    setIsUploading(true);
    try {
      if ( contraseñaActualChange && contraseñaNuevaChange) {
        await UsersService.changePasswordUser(emailActualChangePass, contraseñaActualChange, contraseñaNuevaChange)

        setResultado("Contraseña Modificada con éxito");
        setSuccess(true);
        setTimeout(() => {
          setIsUploading(false);
          logout();
        }, 1500);
      } else {
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo modificar la contraseña.");
    } finally {
      setIsUploading(false);
    }
  };

  const logout = async () => {
    setIsUploading(true);
    try {
      await UsersService.signOutUser();
      setResultado("Cerrando sesion...");
      setSuccess(true);
      setTimeout(() => {
      history.push(ClientRoutes.HOME)
    }, 2000);
    } catch (error: any) {
      setResultado("ERROR: No se pudo cerrar la sesion correctamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const eliminarCuenta = async () => {
    setIsUploading(true);
    try {
      if (contraseñaActualBaja && emailActualBaja) {
        await UsersService.deleteUser(emailActualBaja, contraseñaActualBaja)

        setResultado("Cuenta dada de baja con éxito");
        setSuccess(true);
        setTimeout(() => {
          setIsUploading(false);
          logout();
        }, 1500);
      } else {
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo dar de baja la cuenta.");
    } finally {
      setIsUploading(false);
    }
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <>
      <Grid item xs={2}/>
      <Grid item xs={8} alignContent={"center"} alignItems={"center"}>
      <Card variant="outlined">
            <CardMedia
              component="img"
              height="140"
              image="https://images.deliveryhero.io/image/pedidosya/home-backgrounds/home-background-ar.jpg?quality=100&width=1345" 
            />
          <Grid item className={classes.grid}>
            <Typography align="center" variant="h4">
              Datos de Perfil
            </Typography>
          </Grid>

          <Grid item className={classes.grid}>
            <TextField
              className={classes.root}
              label="Ingrese un Apellido"
              variant="outlined"
              onChange={(e) => setApellido(e.target.value)}
              defaultValue={apellido}
              value={apellido}
            />
          </Grid>

          <Grid item className={classes.grid}>
            <TextField
              className={classes.root}
              label="Ingrese un Nombre"
              variant="outlined"
              onChange={(e) => setNombre(e.target.value)}
              defaultValue={nombre}
              value={nombre}
            />
          </Grid>

          {tipoUser == UserTypes.COMERCIANTE && (
          <Grid item className={classes.grid}>
            <TextField
              className={classes.root}
              label="Ingrese un Cuit"
              variant="outlined"
              onChange={(e) => setCuit(e.target.value)}
              defaultValue={cuit}
              value={cuit}
            />
          </Grid>
          )}

          <Grid container className={classes.grid} direction="row">
            <Grid item>
              <TextField
                disabled={disabledMail}
                className={classes.root}
                label="Ingrese un Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
                value={email}
              />
            </Grid>
            <Grid item>
            <Checkbox
                aria-label= "Cambiar"
                checked={disabledMail}
                onChange={(event) => handleChange(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
          </Grid>
          
          {showInputMailAndContraseña && (
            <Typography align="center" variant="h6">
              Para poder realizar el cambio de Email, es necesario completar los siguientes campos de validacion.
            </Typography>
          )}

          {showInputMailAndContraseña && (
          <Grid item className={classes.grid}>
          <TextField
            disabled={disabledMail}
            className={classes.root}
            label="Ingrese Contraseña Actual"
            variant="outlined"
            type="password"
            onChange={(e) => setContraseña(e.target.value)}
            defaultValue={contraseña}
            value={contraseña}
          />
          </Grid>
          )}

          <Grid
            container
            className={classes.grid}
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Button
                disabled={isUploading}
                variant="contained"
                onClick={() => modificarDatosPerfil()}
                color="secondary"
              >
                Modificar Datos de Perfil
              </Button>
            </Grid>
          </Grid>
      </Card>
      </Grid>
      <Grid item xs={2}/>
      </>

      <>
      <Grid item xs={2}/>
      <Grid item xs={8} alignContent={"center"} alignItems={"center"}>
      <Card variant="outlined">
            <CardMedia
              component="img"
              height="140"
              image="https://images.deliveryhero.io/image/pedidosya/home-backgrounds/home-background-ar.jpg?quality=100&width=1345" 
            />
          <Grid item className={classes.grid}>
            <Typography align="center" variant="h4">
              Cambio de Contraseña
            </Typography>
            <Typography align="center" variant="h6">
              Para poder realizar el cambio de Contraseña, es necesario completar los siguientes campos:
            </Typography>
          </Grid>

          <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese Contraseña Actual"
            variant="outlined"
            type="password"
            onChange={(e) => setContraseñaActualChange(e.target.value)}
            defaultValue={contraseñaActualChange}
            value={contraseñaActualChange}
          />
          </Grid>

          <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese Contraseña Nueva"
            variant="outlined"
            type="password"
            onChange={(e) => setContraseñaNuevaChange(e.target.value)}
            defaultValue={contraseñaNuevaChange}
            value={contraseñaNuevaChange}
          />
          </Grid>

          <Grid
            container
            className={classes.grid}
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Button
                disabled={isUploading}
                variant="contained"
                onClick={() => modificarClave()}
                color="secondary"
              >
                Cambiar Contraseña de Perfil
              </Button>
            </Grid>
          </Grid>
      </Card>
      </Grid>
      <Grid item xs={2}/>
      </>

      <>
      <Grid item xs={2}/>
      <Grid item xs={8} alignContent={"center"} alignItems={"center"}>
      <Card variant="outlined">
            <CardMedia
              component="img"
              height="140"
              image="https://images.deliveryhero.io/image/pedidosya/home-backgrounds/home-background-ar.jpg?quality=100&width=1345" 
            />
          <Grid item className={classes.grid}>
            <Typography align="center" variant="h4">
              Baja de Cuenta
            </Typography>
            <Typography align="center" variant="h6">
              Para poder realizar la baja de la Cuenta, es necesario completar los siguientes campos para poder validar y confirmar la baja de la misma.
            </Typography>
          </Grid>

          <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese Email Actual"
            variant="outlined"
            onChange={(e) => setEmailActualBaja(e.target.value)}
            defaultValue={emailActualBaja}
            value={emailActualBaja}
          />
          </Grid>

          <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese Contraseña Actual"
            variant="outlined"
            type="password"
            onChange={(e) => setContraseñaActualBaja(e.target.value)}
            defaultValue={contraseñaActualBaja}
            value={contraseñaActualBaja}
          />
          </Grid>

          <Grid
            container
            className={classes.grid}
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Button
                disabled={isUploading}
                variant="contained"
                onClick={() => eliminarCuenta()}
                color="secondary"
              >
                Borrar Cuenta
              </Button>
            </Grid>
          </Grid>
      </Card>
      </Grid>
      <Grid item xs={2}/>
      </>

      
            <Grid item className={classes.grid}>
              {isUploading ? (
                <CircularProgress />
              ) : (
                <Snackbar
                  anchorOrigin={{ horizontal: "center", vertical: "top" }}
                  open={!!resultado}
                  autoHideDuration={3000}
                  onClose={() => {
                    setSuccess(false);
                    setResultado("");
                  }}
                >
                  <Alert
                    color={success ? "success" : "error"}
                    severity={success ? "success" : "error"}
                    variant="filled"
                  >
                    {resultado}
                  </Alert>
                </Snackbar>
              )}
            </Grid>
    </Grid>
  );
};

export default Profile;
