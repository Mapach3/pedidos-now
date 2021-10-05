import React from "react";
import { Route } from "react-router";
import PendingOrdersOfShipment from "../components/OrdersRepartidor/PendingOrdersOfShipment";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantOrders: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.ORDERS_LIST_DISTRIBUTOR}>
      <Layout>
        <PendingOrdersOfShipment />
      </Layout>
    </Route>
  );
};

export default RestaurantOrders;
