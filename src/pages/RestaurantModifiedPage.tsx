import React from "react";
import { Route } from "react-router-dom";
import RestaurantModified from "../components/RestaurantModified/RestaurantModified";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantsModifiedPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_MODIFIED}>
      <Layout>
        <RestaurantModified />
      </Layout>
    </Route>
  );
};

export default RestaurantsModifiedPage;
