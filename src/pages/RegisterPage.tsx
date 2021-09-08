import React from "react";
import { Route } from "react-router-dom";
import Register from "../components/Register/Register";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const RegisterPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.REGISTER}>
      <Layout>
        <Register />
      </Layout>
    </Route>
  );
};

export default RegisterPage;
