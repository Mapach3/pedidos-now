import React from "react";
import { Route } from "react-router-dom";
import ProductCreate from "../components/ProductCreate/ProductCreate";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const ProductCreatePage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.PRODUCT_CREATE}>
      <Layout>
        <ProductCreate />
      </Layout>
    </Route>
  );
};

export default ProductCreatePage;
