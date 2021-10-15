import React from "react";
import { Route } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import { ClientRoutes } from "../config/enums";
import Layout from "../layout/Layout";

const ProfilePage: React.FC = () => {
  return (
    <Route exact path={ClientRoutes.PROFILE}>
      <Layout>
        <Profile />
      </Layout>
    </Route>
  );
};

export default ProfilePage;
