import React from "react";
import { Route } from "react-router";
import ClientOrders from "../components/ClientOrders/ClientOrders";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const ClientOrdersPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.ORDERS_LIST_CLIENT}>
      <Layout>
        <ClientOrders />
      </Layout>
    </Route>
  );
};

export default ClientOrdersPage;
