import {Typography } from "@material-ui/core";
import Card from "../../components/Card/card";
import { Restaurante } from "../../models/models";


interface CardListProps{
  comercios: Restaurante[];
}

const CardList: React.FC<CardListProps> = ({comercios}) => {

  return (
    <>
      {comercios.length ? comercios.map((rest) => (
            <Card 
              key={rest.id}
              url={rest.url}
              titulo={rest.titulo}
              descripcion={rest.descripcion}
            />
      )): <Typography variant="h5">No encontramos restaurantes en esa localidad</Typography>}
    </>
  );
}

export default CardList;