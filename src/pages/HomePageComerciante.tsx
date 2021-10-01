import React from "react";
import { Route } from "react-router-dom";
import HomeComerciante from "../components/Home/HomeComerciante";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const HomePageComerciante: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.HOME_COMERCIANTE}>
      <Layout>
      <HomeComerciante />
      </Layout>
    </Route>
  );
};

export default HomePageComerciante;
