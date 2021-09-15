import {Typography } from "@material-ui/core";
import Card from "../../components/Card/card";

interface CardListProps{
  lista: any[];
  verMenu?: any;
}

const CardList: React.FC<CardListProps> = ({lista, verMenu}) => {

  return (
    <>
      {lista?.length ? lista?.map((rest) => (
            <Card 
              verMenu={verMenu}
              key={rest.id}
              url={rest.url}
              titulo={rest.titulo}
              descripcion={rest.descripcion}
            />
      )): <Typography variant="h5">No se encontraron resultados</Typography>}
    </>
  );
}

export default CardList;