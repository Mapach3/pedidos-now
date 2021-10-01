import React from "react";
import { Route } from "react-router";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RestaurantOrders: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.ORDERS_LIST}>
      <Layout>
        <OrdersTable />
      </Layout>
    </Route>
  );
};

export default RestaurantOrders;
