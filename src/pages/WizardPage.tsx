import React from "react";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import Wizard from "../components/Wizard/Wizard";

import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const WizardPage: React.FC<{}> = () => {
  return (
    <LoggedInRoute exact path={ClientRoutes.WIZARD}>
      <Layout>
        <Wizard />
      </Layout>
    </LoggedInRoute>
  );
};

export default WizardPage;
