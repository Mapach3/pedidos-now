import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../styles/styles";
import FetchService from "../../functions/fetch/FetchService";
import { useEffect } from "react";
import CardList from "../../components/List/list";
import { firestore } from "../../config";
import { Restaurante } from "../../models/models";
import { withRouter } from "react-router";

const Restaurants: React.FC = () => {
  const [isLoadingRestaurantes, setIsLoadingRestaurantes] = useState(false);

  const classes = useStyles();

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoadingRestaurantes(true);
      let localidad = 'BANFIELD';
      const response = await FetchService.fetchRestaurantsByLocalidad(
        localidad as string
      );
      setRestaurantes(response);
      setIsLoadingRestaurantes(false);
    };
    fetchRestaurants();
  }, []);

  return (
    <Grid container>
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

export default withRouter(Restaurants);
