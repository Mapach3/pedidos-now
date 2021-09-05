import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const HomePage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.HOME}>
      <Layout>
        <Home />
      </Layout>
    </Route>
  );
};

export default HomePage;
