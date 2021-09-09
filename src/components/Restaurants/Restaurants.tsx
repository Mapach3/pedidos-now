import { CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import FetchService from "../../functions/fetch/FetchService";
import { useEffect } from "react";
import CardList from "../../components/List/list";
import { Restaurante } from "../../models/models";
import { useParams } from "react-router";

const Restaurants: React.FC = () => {
  const [isLoadingRestaurantes, setIsLoadingRestaurantes] = useState(false);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const params: any = useParams();
  useEffect(() => {
    console.log("---" + params.location);
    const fetchRestaurants = async () => {
      setIsLoadingRestaurantes(true);
      let localidad = params.location;
      const response = await FetchService.fetchRestaurantsByLocalidad(
        localidad as string
      );
      setRestaurantes(response);
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
          variant="outlined"
        />
        {isLoadingRestaurantes ? (
          <CircularProgress />
        ) : (
          <CardList comercios={restaurantes} />
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Restaurants;
