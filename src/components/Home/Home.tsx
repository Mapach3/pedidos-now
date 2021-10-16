import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import useStyles from "../../styles/styles";
import { useHistory } from "react-router";
import TextField from "@mui/material/TextField";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  LatLon,
} from "use-places-autocomplete";
import { Box, List, ListItem } from "@mui/material";
import { Direccion } from "../../models/models";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [search, setSearch] = useState("");
  const [latLng, setLatLng] = useState<LatLon>({ lat: 0, lng: 0 });

  const classes = useStyles();

  const history = useHistory();

  const submitSearch = (e: any) => {
    e.preventDefault();
    localStorage.setItem("PedidosNow.Address", value);
    localStorage.setItem("PedidosNow.LatLng", JSON.stringify(latLng));

    history.push(`/restaurants/${search}`);
  };

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

  const handleSelect = (description: any) => async () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description.description, false);
    setSearch(description.description);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    try {
      const results = await getGeocode({ address: description.description });
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
    <div className={classes.homeContainer}>
      <div className={classes.homeSearch}>
        <Typography
          style={{
            textAlign: "center",
            color: "white",
            font: "Helvetica",
            paddingBottom: "10px",
          }}
          variant="h4"
        >
          ¡Volá antes de que llegue tu pedido!
        </Typography>
        <div style={{ display: "flex" }}>
          <TextField
            style={{ width: "100%", background: "white" }}
            onChange={handleInput}
            id="home-autocomplete"
            label="Escribi tu dirección"
            variant="outlined"
            disabled={!ready}
            value={value}
          />
          <Button
            color="secondary"
            style={{
              marginLeft: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            variant="contained"
            onClick={submitSearch}
            disabled={!search}
          >
            Buscar
          </Button>
        </div>
        <div>
          {status === "OK" && (
            <>
              <Box style={{ backgroundColor: "white", width: "88.5%" }}>
                <List>{renderSuggestions()}</List>
              </Box>
            </>
          )}
        </div>
        {!!localStorage.getItem("PedidosNow.JWT") &&
          !!localStorage.getItem("PedidosNow.Direcciones") && (
            <>
              <Typography
                style={{
                  font: "Helvetica",
                  color: "white",
                  paddingTop: "10px",
                }}
              >
                O selecciona una de tus direcciones:{" "}
              </Typography>
              {(
                JSON.parse(
                  localStorage.getItem("PedidosNow.Direcciones")!
                ) as Direccion[]
              ).map((direccion) => (
                <Button
                  key={direccion.direccion}
                  variant="contained"
                  color="secondary"
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    localStorage.setItem(
                      "PedidosNow.Address",
                      direccion.direccion
                    );
                    localStorage.setItem(
                      "PedidosNow.LatLng",
                      JSON.stringify({
                        lat: direccion.latitud,
                        lng: direccion.longitud,
                      })
                    );

                    history.push(`/restaurants/${direccion.direccion}`);
                  }}
                >
                  {direccion.direccion}
                </Button>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

export default Home;
