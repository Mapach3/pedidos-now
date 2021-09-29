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

const ProductCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");

  // Data de formulario de entrada para restaurante
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [precio, setPrecio] = useState("");
  const [restaurantes, setRestaurantes] = useState<any[]>();

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setImagen(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setImagen(null);
  };

  useEffect(() => {
    const fetchOwnerRestaraunts = async () => {
      let owner_id = localStorage.getItem("PedidosNow.UserId");
      if (!owner_id) {
        owner_id = "";
      }
      const ownerRestaurants = await RestaurantsService.getRestaurantsByOwner(
        owner_id
      );
      setRestaurantes(ownerRestaurants);
    };
    fetchOwnerRestaraunts();
  }, []);

  // getInitialState: () => {
  //     let owner_id = localStorage.getItem("PedidosNow.UserId");
  //     if (!owner_id) {
  //         owner_id = '';
  //     }
  //     const ownerRestaurants = RestaurantsService.getRestaurantsByOwner(owner_id);
  //     setRestaurantes(ownerRestaurants);
  // }

  const createRestaurant = async () => {
    setIsUploading(true);
    try {
      if (titulo && descripcion && precio && imagen) {
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

        // Firestore
        await fileRef.getDownloadURL().then((url: string) => {
          firestore
            .collection("restaurants")
            .doc()
            .set({
              titulo: titulo,
              imagen: url,
              descripcion: descripcion,
              precio: precio,
              productos: [],
              dueño: localStorage.getItem("PedidosNow.UserId"),
            });
        });
        console.log("Restaurante dado de alta con éxito");
        setResultado("Restaurante dado de alta con éxito");
        setSuccess(true);
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
          <InputLabel className={classes.label}>restaurantes</InputLabel>
          {/* <Select
            label="restaurantes"
            className={classes.root}
            onChange={(event: React.ChangeEvent<any>) =>
              setRestaurantes(event.target.value)
            }
            required
            variant="outlined"
            value={restaurantes}
            defaultValue={restaurantes}
          >
            {restaurants.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select> */}
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>Precio de envío</InputLabel>
          <OutlinedInput
            className={classes.root}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(e) => setPrecio(e.target.value)}
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
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
              >
                <Alert color="success" severity="success" variant="filled">
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

export default ProductCreate;
