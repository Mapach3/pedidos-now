import { makeStyles, Typography } from "@material-ui/core";
import Card from "../../components/Card/card";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 50,
  },
}));

interface CardListProps {
  lista: any[];
  verMenu?: any;
  nombreSucursal?: string;
  direccionSucursal?: string;
}

const CardList: React.FC<CardListProps> = ({
  lista,
  verMenu,
  nombreSucursal,
  direccionSucursal,
}) => {
  const classes = useStyles();

  return (
    <>
      {lista?.length ? (
        lista?.map((rest) => (
          <Card
            verMenu={verMenu}
            key={rest.id}
            url={rest.url}
            titulo={rest.titulo}
            descripcion={rest.descripcion}
            precio={rest.precio}
            nombreSucursal={nombreSucursal}
            direccionSucursal={direccionSucursal}
          />
        ))
      ) : (
        <Typography className={classes.root} variant="h5">
          No se encontraron resultados
        </Typography>
      )}
    </>
  );
};

export default CardList;
