import React from "react";
import { Route } from "react-router-dom";
import RestaurantCreate from "../components/RestaurantCreate/RestaurantCreate";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantsCreatePage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_CREATE}>
      <Layout>
        <RestaurantCreate />
      </Layout>
    </Route>
  );
};

export default RestaurantsCreatePage;
