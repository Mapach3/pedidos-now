import React from "react";
import { Route } from "react-router-dom";
import HomeRepartidor from "../components/Home/HomeRepartidor";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const HomePageComerciante: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.HOME_REPARTIDOR}>
      <Layout>
      <HomeRepartidor />
      </Layout>
    </Route>
  );
};

export default HomePageComerciante;
