import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const Restaurants: React.FC = () => {
  const [isLoadingRestaurantes, setIsLoadingRestaurantes] = useState(false);

  return (
    <Grid container spacing={4}>
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
          // <CardList comercios={restaurantes} />
          <></>
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Restaurants;
