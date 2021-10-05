import React from "react";
import { Route } from "react-router-dom";
import RestaurantDelete from "../components/RestaurantDelete/RestaurantDelete";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantsDeletePage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_DELETE}>
      <Layout>
        <RestaurantDelete />
      </Layout>
    </Route>
  );
};

export default RestaurantsDeletePage;
