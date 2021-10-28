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
import { storage, firestore } from "../../config";
import { Alert } from "@material-ui/lab";
import { RestaurantsService } from "../../fetch/RestaurantsService";
import firebase from "firebase";
import { Restaurante,Producto } from "../../models/models";

const ProductCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resultado, setResultado] = useState("");

  // Data de formulario de entrada para restaurante
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restauranteDelProducto, setRestauranteDelProducto] = useState("");
  const [categorias, setCategorias] = useState<String[]>(["minutas","pastas","postres","acompañamientos","bebidas"]);

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
      let ownerRestaurants: any[] = [];
      if (!owner_id) {
        owner_id = "";
      }
      const queryResult = await RestaurantsService.getRestaurantsByOwner(
        owner_id
      );
      queryResult.map((item) => {
        ownerRestaurants.push(item);
      });
      setRestaurantes(ownerRestaurants);
    };
    fetchOwnerRestaraunts();
  }, []);

  const createProduct = async () => {
    setIsUploading(true);
    try {
      if (titulo && descripcion && precio && imagen && restauranteDelProducto && categoria) {
        let restaurant: Restaurante 
        restaurant = await RestaurantsService.getRestaurantByName(restauranteDelProducto);
        
        // Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child("restaurants/" + titulo);
        await fileRef.put(imagen);

        if (restaurant) {
          const url = await fileRef.getDownloadURL();
          let menu: Producto[] = restaurant.menu
          let producto: Producto = {
            descripcion: descripcion,
            precio: precio,
            titulo: titulo,
            categoria: categoria,
            url: url
          }
          menu.push(producto)
          
          // Firestore
          await firestore.collection("restaurants").doc(restaurant.uid).update({
            menu: menu
          })
        }

        setResultado("Producto dado de alta con éxito");
        setSuccess(true);
      }else{
        setResultado("Faltan campos por completar");
        setSuccess(false);
      }
    } catch (error) {
      setResultado("ERROR: No se pudo dar de alta el nuevo producto");
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
            Alta de producto
          </Typography>
        </Grid>

        <Grid item className={classes.grid}>
          <TextField
            className={classes.root}
            label="Ingrese un nombre de producto"
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
            Seleccione una imagen como logo del producto
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
          <InputLabel className={classes.label}>restauranteDelProducto</InputLabel>
           <Select
            label="restauranteDelProducto"
            className={classes.root}
            onChange={(event: React.ChangeEvent<any>) =>
              setRestauranteDelProducto(event.target.value)
            }
            required
            variant="outlined"
            value={restauranteDelProducto}
            defaultValue={restaurantes}
          >
            {
            restaurantes.map((item) => (
              <MenuItem key={item.titulo} value={item.titulo}>
                {item.titulo}
              </MenuItem>
            ))}
          </Select> 
        </Grid>

        <Grid item className={classes.grid}>
          <InputLabel className={classes.label}>Precio unitario</InputLabel>
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
              disabled={isUploading}
              variant="contained"
              onClick={() => createProduct()}
              color="secondary"
            >
              Agregar producto
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

export default ProductCreate;
