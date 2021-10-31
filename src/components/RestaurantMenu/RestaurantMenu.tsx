import { CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Producto, Restaurante } from "../../models/models";
import { useParams } from "react-router";
import FetchService from "../../functions/fetch/FetchService";
import CardList from "../List/list";
import Pedido from "../Pedido/Pedido";
import { useDispatch, useSelector } from "react-redux";
import { clearPedido } from "../../redux/actions/pedidoAction";

const RestaurantMenu: React.FC = () => {
  const params: any = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const itemsPedido = useSelector((state: any) => state.infoPedido);
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("")
  const [fetchedRestaurant, setFetchedRestaurant] = useState<Restaurante>();

  const searchByNameOrCategory = async (name: string) => {
    setIsLoadingMenu(true);
    setInputText(name);
    const allMenu = await getMenu();
    const filteredItems = allMenu.filter((menuItem) =>
      menuItem.titulo.toLowerCase().includes(name.toLowerCase()) || 
        menuItem.categoria?.toLowerCase().includes(name.toLowerCase())

    );
    setProductos(filteredItems);
    setIsLoadingMenu(false);
  };

  const getMenu = async () => {
    const response = await FetchService.fetchRestaurantByTitulo(
      params.titulo as string
    );
    console.log({ response });
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
      <Grid item xs={3}></Grid>
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
