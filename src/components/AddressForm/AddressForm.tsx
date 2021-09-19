import {
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Locations, LocationsEnumLabels } from "../../enums/Locations";

interface Props {
  calle: string;
  setCalle: (value: string) => void;
  ciudad: string;
  setCiudad: (value: string) => void;
  telefono: string;
  setTelefono: (value: string) => void;
}

const AddressForm: React.FC<Props> = ({
  setCalle,
  setCiudad,
  setTelefono,
  calle,
  ciudad,
  telefono,
}) => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{
        marginBottom: "1rem",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        Ingresa estos datos para finalizar el pedido
      </Typography>
      <TextField
        onChange={(event) => setCalle(event.target.value)}
        id="calle"
        label="Dirección"
        variant="outlined"
        required
        style={{ width: "100%", paddingBottom: "1rem" }}
        value={calle}
      />
      <Select
        label="Localidad"
        onChange={(event: React.ChangeEvent<any>) =>
          setCiudad(event.target.value)
        }
        required
        variant="outlined"
        style={{ width: "100%" }}
        labelId="userType"
        value={ciudad}
        defaultValue={ciudad}
      >
        {Object.values(Locations).map((item) => (
          <MenuItem key={item} value={Locations[item]}>
            {LocationsEnumLabels[item]}
          </MenuItem>
        ))}
      </Select>

      <TextField
        onChange={(event: React.ChangeEvent<any>) =>
          setTelefono(event.target.value)
        }
        label="Telefono"
        type="telefono"
        variant="outlined"
        value={telefono}
        required
        style={{ width: "100%", paddingBottom: "1rem", marginTop: "1rem" }}
      />
    </Container>
  );
};

export default AddressForm;
