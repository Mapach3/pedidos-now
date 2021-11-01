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
  Box,
  List,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../styles/styles";
import { storage, firestore } from "../../config";
import { Alert } from "@material-ui/lab";
import { RestaurantsService } from "../../fetch/RestaurantsService";
import { Restaurante } from "../../models/models";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  LatLon,
} from "use-places-autocomplete";

const RestaurantCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");
  const [categoria, setCategoria] = useState("");
  // Data de formulario de entrada para restaurante
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState("");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState<String[]>(["Comida rapida","Gourmet","Familiar","Para llevar","Buffet"]);
  const [latLng, setLatLng] = useState<LatLon>({ lat: 0, lng: 0 });
  //setCategorias(["Comida rapida","Gourmet"])
  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setImagen(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setImagen(null);
  };

  const createRestaurant = async () => {
    // debugger;
    setIsUploading(true);
    try {
      if (titulo && descripcion && precioEnvio && imagen && direccion && categoria) {
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
          localidad: direccion
            .split(",")[1]
            .toUpperCase()
            .trim()
            .replaceAll(" ", "_"),
          mapPoint: latLng,
          direccion,
          dueño: localStorage.getItem("PedidosNow.UserId") || "",
          isDelete: false,
          categoria : categoria.toLowerCase()
        };

        // Firestore
        await firestore.collection("restaurants").doc().set(entity);

        setResultado("Restaurante dado de alta con éxito");
        setSuccess(true);
      } else {
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo dar de alta el nuevo restaurante");
    } finally {
      setIsUploading(false);
    }
  };

  const classes = useStyles();

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
          <InputLabel className={classes.label}>Categoria</InputLabel>
           <Select
            label="Categoria"
            className={classes.root}
            onChange={(event: React.ChangeEvent<any>) =>
              setCategoria(event.target.value)
            }
            required
            variant="outlined"
            value={categoria}
          
          >
            {
            categorias.map((item) => (
              <MenuItem key={item.toString()} value={item.toString()}>
                {item}
              </MenuItem>
            ))}
          </Select> 
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
          <TextField
            variant="outlined"
            className={classes.root}
            onChange={handleInput}
            id="home-autocomplete"
            placeholder="Direccion"
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
