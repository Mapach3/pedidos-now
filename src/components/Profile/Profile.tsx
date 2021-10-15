import {
  CircularProgress,
  Grid,
  Input,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Checkbox,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import useStyles from "../../styles/styles";
import { Alert } from "@material-ui/lab";
import { UsersService } from "../../fetch/UsersService";
import { UserTypes } from "../../enums/UserTypes";


const Profile: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");
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

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
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
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default Profile;
