import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "../AddressForm/AddressForm";
import {
  CircularProgress,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import Pedido from "../Pedido/Pedido";
import { Order, PedidoItems } from "../../models/models";
import { Locations, LocationsEnumLabels } from "../../enums/Locations";
import PagoForm from "../PagoForm/PagoForm";
import {
  PaymentMethods,
  PaymentMethodsLabels,
} from "../../enums/PaymentMethods";
import { useDispatch, useSelector } from "react-redux";
import { OrdersService } from "../../fetch/OrdersService";
import { useHistory } from "react-router";
import { ClientRoutes } from "../../config/enums";
import { EstadoPedido } from "../../enums/EstadoPedido";
import { clearPedido } from "../../redux/actions/pedidoAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Dirección de entrega", "Forma de pago", "¡Ultimo paso!"];
}

const Wizard: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  //Direccion State
  const [calle, setCalle] = useState(
    localStorage.getItem("PedidosNow.Address")!.split(",")[0]
  );
  const [ciudad, setCiudad] = useState(
    localStorage.getItem("PedidosNow.Address")!.split(",")[1].trim()
  );
  const [telefono, setTelefono] = useState("");
  const itemsPedido = useSelector((state: any) => state.infoPedido);

  //Pago State
  const [metodoPago, setMetodoPago] = useState("");
  const dispath = useDispatch();

  //Wizard State
  const [pedido] = useState<PedidoItems>(
    sessionStorage.getItem("PedidosNow.Pedido")
      ? JSON.parse(sessionStorage.getItem("PedidosNow.Pedido")!)
      : { items: [], restaurante: "" }
  );

  const [isSubmittingPedido, setIsSubmittingPedido] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      processOrder();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const cancelPedido = () => {
    setActiveStep(0);
    dispath(clearPedido());
    history.push(ClientRoutes.HOME);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const history = useHistory();

  const processOrder = async () => {
    // debugger;
    const order: Order = {
      items: itemsPedido.infoPedido,
      total: calcularSubtotal(),
      user_id: localStorage.getItem("PedidosNow.UserId"),
      nombre_restaurante: itemsPedido.nombreRestaurante,
      localidad: ciudad,
      telefono: telefono,
      direccion_entrega: calle,
      direccion_restaurante: itemsPedido.direccionRestaurante,
      estado: EstadoPedido.ESPERANDO,
      rechazado_restaurante: false,
      metodoPago: metodoPago,
    };
    try {
      setIsSubmittingPedido(true);
      await OrdersService.postOrderToCollection(order);
      setDialogMessage(
        "Pedido confirmado con éxito! te avisaremos cuando salga el repartidor"
      );
      setOpenDialog(true);
    } catch (error: any) {
      setDialogMessage(
        "Lo sentimos, ocurrió un error al generar tu pedido. Por favor intenta nuevamente en unos minutos."
      );
      setOpenDialog(true);
    } finally {
      setIsSubmittingPedido(false);
    }
  };

  const calcularSubtotal = () => {
    let subTotal = 0;
    if (pedido) {
      itemsPedido.infoPedido.forEach((item: any) => {
        subTotal += item.cantidad * item.precio;
      });
    }
    return subTotal;
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <AddressForm
            telefono={telefono}
            setTelefono={(value: string) => setTelefono(value)}
          />
        );
      case 1:
        return (
          <PagoForm
            metodoPago={metodoPago}
            setMetodoPago={(value: string) => setMetodoPago(value)}
          />
        );
      case 2:
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
              ¿Son correctos estos datos?
            </Typography>
            <TextField
              label="Dirección"
              variant="outlined"
              value={calle}
              InputProps={{ readOnly: true }}
              style={{ width: "100%", marginTop: "1rem" }}
            />
            <TextField
              label="Localidad"
              variant="outlined"
              value={ciudad}
              InputProps={{ readOnly: true }}
              style={{ width: "100%", marginTop: "1rem" }}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              value={telefono}
              InputProps={{ readOnly: true }}
              style={{ width: "100%", marginTop: "1rem" }}
            />
            <TextField
              label="Método de pago"
              variant="outlined"
              value={PaymentMethodsLabels[metodoPago as PaymentMethods]}
              InputProps={{ readOnly: true }}
              style={{ width: "100%", marginTop: "1rem" }}
            />
          </Container>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  if (!itemsPedido.infoPedido.length) {
    return (
      <Grid
        container
        sm={12}
        md={12}
        lg={5}
        justifyContent="center"
        style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
      >
        <Pedido />
      </Grid>
    );
  }

  return (
    <>
      <Grid container style={{ marginTop: "1rem" }}>
        <Grid item xs={12} lg={6}>
          <div
            className={classes.root}
            style={{ width: "80%", marginLeft: "1rem" }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <>
                  {isSubmittingPedido && (
                    <div style={{ textAlign: "center" }}>
                      <Typography className={classes.instructions}>
                        Finalizando pedido...
                      </Typography>
                      <div>
                        <CircularProgress />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <Grid
                    style={{ marginBottom: "10rem" }}
                    container
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Volver
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={cancelPedido}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        (activeStep === 0 && !telefono.length) ||
                        (activeStep === 1 && !metodoPago.length)
                      }
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </Button>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Pedido pedido={pedido} isRestaurantView={false} />
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={setOpenDialog}
        open={openDialog}
      >
        <DialogTitle id="alert-dialog-title">
          {dialogMessage}
          <DialogActions>
            <Button
              variant="contained"
              style={{ marginRight: "7rem", marginTop: "1rem" }}
              color="secondary"
              onClick={() => history.push(ClientRoutes.HOME)}
            >
              Volver a la home
            </Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default Wizard;
