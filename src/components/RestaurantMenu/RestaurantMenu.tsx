import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Producto, Restaurante } from "../../models/models";
import { useParams } from "react-router";
import FetchService from "../../functions/fetch/FetchService";
import CardList from "../List/list";
import Pedido from "../Pedido/Pedido";
import { useDispatch, useSelector } from "react-redux";
import { clearPedido } from "../../redux/actions/pedidoAction";
import useStyles from "../../styles/styles";
import { menuItemClasses } from "@mui/material";

const RestaurantMenu: React.FC = () => {
  const params: any = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const itemsPedido = useSelector((state: any) => state.infoPedido);
  const dispatch = useDispatch();
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);

  const [inputText, setInputText] = useState("")
  const [fetchedRestaurant, setFetchedRestaurant] = useState<Restaurante>();

  const classes = useStyles();

  const searchByNameOrCategory = async (name: string) => {
    setIsLoadingMenu(true);
    setInputText(name);
    const allMenu = await getMenu();
    const filteredItems = allMenu.filter(
      (menuItem) =>
        menuItem.titulo.toLowerCase().includes(name.toLowerCase()) ||
        menuItem.categoria?.toLowerCase().includes(name.toLowerCase())
    );
    setProductos(filteredItems);
    setIsLoadingMenu(false);
  };

  const filtrarPrecio = async () => {

    // console.log(precioMinimo, precioMaximo) 
    setIsLoadingMenu(true);
    const allMenu = await getMenu();
    const filteredItems = allMenu.filter(
      //@ts-ignore
      (menuItem) => menuItem.precio >= precioMinimo && menuItem.precio <= precioMaximo
    );
    setProductos(filteredItems);
    setIsLoadingMenu(false);
  };

  const getMenu = async () => {
    const response = await FetchService.fetchRestaurantByTitulo(
      params.titulo as string
    );
    // console.log({ response });
    setFetchedRestaurant(response);
    return response.menu;
  };

  useEffect(() => {
    dispatch(clearPedido());
    const fetchProductos = async () => {
      setIsLoadingMenu(true);
      const menu = await getMenu();
      setProductos(menu);
      setIsLoadingMenu(false);
    };
    fetchProductos();
  }, [params.titulo, dispatch]);

  return (
    <Grid container style={{ padding: "1rem 1rem 3rem 1rem" }}>
      <Grid item xs={3} style={{ padding: "0.4rem" }}>
        {/* Filtro por precio */}
        <Typography style={{ paddingBottom: "0.4rem", fontWeight: "bold" }}>
          Filtrar por precio
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
        >
          <Grid item xs>
            <InputLabel
              style={{ paddingBottom: "0.4rem", paddingTop: "0.4rem" }}
            >
              Mínimo
            </InputLabel>
            <OutlinedInput
              // style={{ width: "70%", height: "50%", paddingBottom: "0.4rem" }}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => isNaN(parseFloat(e.target.value))?setPrecioMinimo(0):setPrecioMinimo(parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs>
            <InputLabel
              style={{ paddingBottom: "0.4rem", paddingTop: "0.4rem" }}
            >
              Máximo
            </InputLabel>
            <OutlinedInput
              // style={{ width: "70%", height: "50%", paddingBottom: "0.4rem" }}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => isNaN(parseFloat(e.target.value))?setPrecioMaximo(0):setPrecioMaximo(parseFloat(e.target.value))}
            />
          </Grid>
        </Grid>
        <Button
          disabled={isLoadingMenu}
          variant="contained"
          onClick={() => { 
            if(precioMinimo==0||precioMaximo==0){
              alert("Debe completar tanto precio mínimo como máximo")
            } else {
              filtrarPrecio()
            }
          }}
          color="secondary"
        >
          Filtrar
        </Button>
        {/* Fin de filtro de precio */}
      </Grid>

      <Grid item style={{ textAlign: "center" }} xs={6}>
          
        <TextField
          style={{ width: "60%" }}
          id="outlined-basic"
          label="Buscar productos..."
          value={inputText} 
          variant="outlined"
          onChange={(event) => {
            searchByNameOrCategory(event.target.value);
          }}
        />
        <div style={{
              width: "100%",
              paddingTop: "1rem",
              paddingBottom: "1rem"
            }}>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "20%"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("minutas");
          }} > minutas
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "20%"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("pastas");
          }} > pastas
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "20%"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("acompañamiento");
          }} > acompañamiento
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "20%"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("bebidas");
          }} > bebidas
          </Button>
          </div>
        {isLoadingMenu ? (
          <CircularProgress />
        ) : (
          <CardList
            lista={productos}
            nombreSucursal={params.titulo}
            direccionSucursal={fetchedRestaurant?.direccion.split(",")[0]}
          />
        )}
      </Grid>

      <Grid item xs={3}>
        {!!localStorage.getItem("PedidosNow.JWT") && (
          <Pedido
            pedido={{
              items: itemsPedido.infoPedido,
              restaurante: params.titulo,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default RestaurantMenu;
