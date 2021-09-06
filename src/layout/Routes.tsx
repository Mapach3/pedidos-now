import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";
import RestaurantsPage from "../pages/RestaurantsPage";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*Public routes not requiring Login*/}
        <Route exact path={ClientRoutes.HOME}>
          <HomePage />
        </Route>

        <Route exact path={ClientRoutes.LOGIN}>
          <Login />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANTS}>
          <RestaurantsPage />
        </Route>

        {/* LoggedInRoute requiring route, otherwise Redirects to Login */}
        <LoggedInRoute exact path={ClientRoutes.PROFILE}>
          <ProfilePage />
        </LoggedInRoute>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
