import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 20,
    padding: 15,
  },
  media: {
    borderRadius: "10%",
    border: "0.5px solid",
    width: "100%",
    height: "80%",
  },
  contend: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface props {
  url: string;
  titulo: string;
  descripcion: string;
}

export default function ItemCard({ url, titulo, descripcion }: props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container justify="center">
      <Card className={classes.root} variant="outlined">
        <Grid container direction="row" alignItems="center">

        <Grid  container item xs={2} justify="flex-start">
          <img className={classes.media} src={url} />
        </Grid>
        <Grid  container item xs={3} justify="flex-end" >
          <CardContent className={classes.contend}>
          <Typography style={{fontWeight: 'bold'}}>{titulo}</Typography>
          <Typography>{descripcion}</Typography>
          </CardContent>
        </Grid>

        </Grid>
      </Card>
    </Grid>
  );
}
