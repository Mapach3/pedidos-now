import {
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

interface Props {
  telefono: string;
  setTelefono: (value: string) => void;
}

const AddressForm: React.FC<Props> = ({ setTelefono, telefono }) => {
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
