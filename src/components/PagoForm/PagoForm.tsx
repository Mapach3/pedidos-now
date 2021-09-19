import { Container, MenuItem, Select, Typography } from "@material-ui/core";
import React from "react";
import {
  PaymentMethods,
  PaymentMethodsLabels,
} from "../../enums/PaymentMethods";

interface Props {
  metodoPago: string;
  setMetodoPago: (value: string) => void;
}

const PagoForm: React.FC<Props> = ({ metodoPago, setMetodoPago }) => {
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
        Seleccioná un método de pago
      </Typography>
      <Select
        label="Localidad"
        required
        variant="outlined"
        style={{ width: "100%", marginTop: "1rem" }}
        labelId="userType"
        value={metodoPago}
        onChange={(e: React.ChangeEvent<any>) => setMetodoPago(e.target.value)}
      >
        {Object.values(PaymentMethods).map((item) => (
          <MenuItem
            key={item}
            value={PaymentMethods[item]}
            disabled={PaymentMethods[item] === "TARJETA"}
          >
            {PaymentMethodsLabels[item]}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export default PagoForm;
