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
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import useStyles from "../../styles/styles";
import { Locations, LocationsEnumLabels } from "../../enums/Locations";
import { storage, firestore } from "../../config";
import { Alert } from "@material-ui/lab";
import { RestaurantsService } from "../../fetch/RestaurantsService";
import { Restaurante } from "../../models/models";

const RestaurantCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");

  // Data de formulario de entrada para restaurante
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [localidad, setLocalidad] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {}, []);

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setImagen(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setImagen(null);
  };

  const createRestaurant = async () => {
    setIsUploading(true);
    try {
      if (titulo && descripcion && precioEnvio && imagen && localidad) {
        const restaurant = await RestaurantsService.getRestaurantByName(titulo);
        if (restaurant) {
          setResultado("ERROR: Restaurante duplicado.");
          setIsUploading(false);
          return;
        }
        // Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child("restaurants/" + titulo);
        await fileRef.put(imagen);

        const url = await fileRef.getDownloadURL();
        const entity: Restaurante = {
          titulo,
          url,
          descripcion,
          precioEnvio,
          menu: [],
          localidad,
          dueño: localStorage.getItem("PedidosNow.UserId") || "",
          isDelete: false
        };

        // Firestore
        await firestore.collection("restaurants").doc().set(entity);

        console.log("Restaurante dado de alta con éxito");
        setResultado("Restaurante dado de alta con éxito");
        setSuccess(true);
      }else{
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      console.log("Error al dar de alta el restaurante");
      setResultado("ERROR: No se pudo dar de alta el nuevo restaurante");
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
            Alta de restaurante
          </Typography>
        </Grid>

        <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese un nombre único"
            variant="outlined"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Grid>

        <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese una descripción"
            variant="outlined"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>
            Seleccione una imagen como logo del restaurante
          </InputLabel>
          <Input
            className={classes.root}
            type="file"
            onChange={(e) => onFileChange(e)}
            inputProps={{
              accept: ".png, .jpg, .bmp",
            }}
          />
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>Localidad</InputLabel>
          <Select
            label="Localidad"
            className={classes.root}
            onChange={(event: React.ChangeEvent<any>) =>
              setLocalidad(event.target.value)
            }
            required
            variant="outlined"
            value={localidad}
            defaultValue={localidad}
          >
            {Object.values(Locations).map((item) => (
              <MenuItem key={item} value={Locations[item]}>
                {LocationsEnumLabels[item]}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>Precio de envío</InputLabel>
          <OutlinedInput
            className={classes.root}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(e) => setPrecioEnvio(e.target.value)}
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
              onClick={() => createRestaurant()}
              color="secondary"
            >
              Crear restaurante
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

export default RestaurantCreate;
