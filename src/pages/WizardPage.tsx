import React from "react";
import { Route } from "react-router";
import Wizard from "../components/Wizard/Wizard";

import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const WizardPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.CHECKOUT}>
      <Layout>
        <Wizard />
      </Layout>
    </Route>
  );
};

export default WizardPage;
