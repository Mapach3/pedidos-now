import { CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import FetchService from "../../functions/fetch/FetchService";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CardList from "../../components/List/list";
import { Restaurante } from "../../models/models";
import { useHistory, useParams } from "react-router";
import { haversine_distance } from "../../helpers/distance-helper";

const Restaurants: React.FC = () => {
  const [isLoadingRestaurantes, setIsLoadingRestaurantes] = useState(false);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const params: any = useParams();
  const history = useHistory();
  const [inputText, setInputText] = useState("")
  const verMenu = (e: any, titulo: string) => {
    e.preventDefault();
    history.push(`/restaurantMenu/${titulo}`);
  };

  const searchByNameOrCategory = async (name: string) => {
    setIsLoadingRestaurantes(true);
    setInputText(name);
    const allRestaurants = await getAllRestaurants();
    let userLatLng = JSON.parse(localStorage.getItem("PedidosNow.LatLng")!);
    const filteredRestaurants = allRestaurants
      .filter((restaurant) =>
        restaurant.titulo.toLowerCase().includes(name.toLowerCase()) || 
        restaurant.categoria?.toLowerCase().includes(name.toLowerCase())
      )
      .filter(
        (rest) =>
          haversine_distance(userLatLng, {
            lat: rest.mapPoint!.lat,
            lng: rest.mapPoint!.lng,
          }) <= 2.5
      );
    setRestaurantes(filteredRestaurants);
    setIsLoadingRestaurantes(false);
  };

  const getAllRestaurants = async () => {
    let localidad = params.location;
    const response = await FetchService.fetchRestaurantsByLocalidad(
      localidad as string
    );
    return response;
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoadingRestaurantes(true);
      const response = await getAllRestaurants();
      setRestaurantes(response);
      if (localStorage.getItem("PedidosNow.LatLng")) {
        let userLatLng = JSON.parse(localStorage.getItem("PedidosNow.LatLng")!);

        let restaurantesFiltradosPorDireccion = response.filter(
          (rest) =>
            haversine_distance(userLatLng, {
              lat: rest.mapPoint!.lat,
              lng: rest.mapPoint!.lng,
            }) <= 2.5
        );

        setRestaurantes(restaurantesFiltradosPorDireccion);
      } else {
        setRestaurantes([]);
      }

      setIsLoadingRestaurantes(false);
    };
    fetchRestaurants();
  }, [params.location]);

  return (
    <Grid container style={{ padding: "1rem 0 10rem 0" }}>
      <Grid item xs={3}></Grid>
      <Grid item style={{ textAlign: "center" }} xs={6}>
        <TextField
          style={{ width: "60%" }}
          id="outlined-basic" 
          label="Buscar..."
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
              width: "15%",
              fontSize: "11px"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("Comida rapida");
          }} > Comida rapida
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "15%",
              fontSize: "11px"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("Gourmet");
          }} > Gourmet
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "15%",
              fontSize: "11px"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("Familiar");
          }} > Familiar
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "15%",
              fontSize: "11px"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("Para llevar");
          }} > Para llevar
          </Button>
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              width: "15%",
              fontSize: "11px"
            }}
            variant="outlined"
            onClick={(event) => {
            searchByNameOrCategory("Buffet");
          }} > Buffet
          </Button>
          </div>
        {isLoadingRestaurantes ? (
          <CircularProgress />
        ) : (
          <CardList lista={restaurantes} verMenu={verMenu} />
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Restaurants;
