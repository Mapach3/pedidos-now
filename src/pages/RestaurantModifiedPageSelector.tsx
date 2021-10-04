import React from "react";
import { Route } from "react-router-dom";
import RestaurantModifiedSelector from "../components/RestaurantModified/RestaurantModifiedSelector";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantsModifiedPageSelector: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_MODIFIED_SELECTOR}>
      <Layout>
        <RestaurantModifiedSelector />
      </Layout>
    </Route>
  );
};

export default RestaurantsModifiedPageSelector;
