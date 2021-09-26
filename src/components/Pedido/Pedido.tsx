import {
  Button,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";
import { PedidoItems } from "../../models/models";
import { eliminarItemDeCarrito } from "../../redux/actions/pedidoAction";

interface PedidoProps {
  pedido?: PedidoItems;
  renderEditButton?: boolean;
  isRestaurantView?: boolean;
}

const Pedido: React.FC<PedidoProps> = ({
  pedido,
  renderEditButton = false,
  isRestaurantView = true,
}) => {
  const history = useHistory();
  const itemsPedido = useSelector((state: any) => state.infoPedido);
  const dispath = useDispatch();

  const calcularSubtotal = () => {
    let subTotal = 0;
    if (itemsPedido) {
      itemsPedido.infoPedido.forEach((item: any) => {
        subTotal += item.cantidad * item.precio + 119;
      });
    }
    return subTotal;
  };

  const eliminarDeCarrito = (posicionCarrito: number) => {
    debugger;
    dispath(eliminarItemDeCarrito(posicionCarrito));
  };

  return (
    <Card>
      <CardContent>
        {itemsPedido && itemsPedido.infoPedido.length ? (
          <>
            <Typography style={{ textAlign: "center" }} gutterBottom>
              Mi pedido a: {itemsPedido.nombreRestaurante}
            </Typography>
            <Divider />
            {itemsPedido.infoPedido.map((item: any) => (
              <div style={{ margin: "0.5rem" }}>
                <Typography>
                  {isRestaurantView && (
                    <Tooltip title="Eliminar">
                      <Button
                        color="secondary"
                        variant="text"
                        style={{ margin: 0 }}
                        size="small"
                        onClick={() => eliminarDeCarrito(item.posicionCarrito)}
                      >
                        X
                      </Button>
                    </Tooltip>
                  )}
                  {item.cantidad} x {item.producto}
                  <div style={{ float: "right" }}>
                    ${item.cantidad * item.precio}
                  </div>
                </Typography>
              </div>
            ))}
            <Typography style={{ marginTop: "1rem" }}>
              Envío:
              <div style={{ float: "right" }}>$119</div>
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              Subtotal:
              <div style={{ float: "right" }}>${calcularSubtotal()}</div>
            </Typography>
            <Divider />
            {isRestaurantView && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push(ClientRoutes.CHECKOUT)}
                >
                  Terminar Pedido
                </Button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <SearchOutlined style={{ fontSize: "5rem" }} />
            <Typography>Tu pedido está vacío</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Pedido;
