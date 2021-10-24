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
  ListItem,
  List,
  Box,
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
import { useParams } from "react-router";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  LatLon,
} from "use-places-autocomplete";

const RestaurantModified: React.FC = () => {
  const params: any = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");

  // Data de formulario de entrada para restaurante
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [localidad, setLocalidad] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [firstDireccion, setFirstDireccion] = useState("");
  const [latLng, setLatLng] = useState<LatLon>({ lat: 0, lng: 0 });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "ar" },
    },
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      const responseResto = await RestaurantsService.getRestaurantByUid(
        params.uid
      );
      setTitulo(responseResto.titulo);
      setDescripcion(responseResto.descripcion);
      setLocalidad(responseResto.localidad);
      setPrecioEnvio(responseResto.precioEnvio);
      setDireccion(responseResto.direccion);
      setFirstDireccion(responseResto.direccion);
      setLatLng(responseResto.mapPoint);

      // // Storage
      // const storageRef = storage.ref();
      // const fileRef = storageRef.child("restaurants/" + responseResto.titulo);
      // await fileRef.put(imagen);
    };
    fetchRestaurant();
  }, [params.uid, setValue, clearSuggestions]);

  const handleSelect = (suggestion: any) => async () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(suggestion.description, false);
    setDireccion(suggestion.description);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    try {
      const results = await getGeocode({ address: suggestion.description });
      const latLng = await getLatLng(results[0]);
      setLatLng(latLng);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <ListItem
          key={place_id}
          onClick={handleSelect(suggestion)}
          style={{ cursor: "pointer" }}
        >
          <span>
            <strong>{main_text}</strong> {secondary_text}
          </span>
        </ListItem>
      );
    });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setImagen(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setImagen(null);
  };

  const modificarRestaurante = async () => {
    setIsUploading(true);
    try {
      if (titulo && descripcion && precioEnvio /*&& imagen*/ && localidad) {
        // // Storage
        // const storageRef = storage.ref();
        // const fileRef = storageRef.child("restaurants/" + titulo);
        // await fileRef.put(imagen);

        // const url = await fileRef.getDownloadURL();

        // Firestore
        await firestore
          .collection("restaurants")
          .doc(params.uid)
          .update({
            titulo: titulo,
            // url: url,
            descripcion: descripcion,
            precioEnvio: precioEnvio,
            mapPoint: latLng,
            direccion,
            localidad: direccion
              .split(",")[1]
              .trim()
              .toUpperCase()
              .replaceAll(" ", "_"),
          });

        setResultado("Restaurante modificado con éxito");
        setFirstDireccion(direccion);
        setSuccess(true);
      } else {
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo modificar el restaurante");
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
            Modificacion de restaurante
          </Typography>
        </Grid>

        <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese un nombre único"
            variant="outlined"
            onChange={(e) => setTitulo(e.target.value)}
            defaultValue={titulo}
            value={titulo}
          />
        </Grid>

        <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese una descripción"
            variant="outlined"
            onChange={(e) => setDescripcion(e.target.value)}
            defaultValue={descripcion}
            value={descripcion}
          />
        </Grid>

        {/* <Grid item className={classes.grid}>
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
            defaultValue={imagen}
            value={imagen}
          />
        </Grid> */}

        <Grid item className={classes.grid}>
          <TextField
            variant="outlined"
            className={classes.root}
            onChange={handleInput}
            id="home-autocomplete"
            placeholder="Nueva direccion"
            disabled={!ready}
            value={value}
          />
          <div>
            {status === "OK" && (
              <>
                <Box style={{ backgroundColor: "white", width: "88.5%" }}>
                  <List>{renderSuggestions()}</List>
                </Box>
              </>
            )}
          </div>
          <InputLabel style={{ marginTop: "10px" }}>
            La dirección actual es: {firstDireccion}
          </InputLabel>
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>Precio de envío</InputLabel>
          <OutlinedInput
            className={classes.root}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(e) => setPrecioEnvio(e.target.value)}
            value={precioEnvio}
            defaultValue={precioEnvio}
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
              onClick={() => modificarRestaurante()}
              color="secondary"
            >
              Modificar restaurante
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

export default RestaurantModified;
