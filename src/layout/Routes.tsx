import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import HomePage from "../pages/HomePage";
import HomePageComerciante from "../pages/HomePageComerciante";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import RestaurantsCreatePage from "../pages/RestaurantCreatePage";
import RestaurantMenuPage from "../pages/RestaurantMenuPage";
import RestaurantOrders from "../pages/RestaurantOrders";
import RestaurantsPage from "../pages/RestaurantsPage";
import WizardPage from "../pages/WizardPage";

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

        <Route exact path={ClientRoutes.LOGOUT}>
          <Logout />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANTS}>
          <RestaurantsPage />
        </Route>

        <Route exact path={ClientRoutes.REGISTER}>
          <RegisterPage />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANT_MENU}>
          <RestaurantMenuPage />
        </Route>        

        <Route exact path={ClientRoutes.HOME_COMERCIANTE}>
          <HomePageComerciante />
        </Route>

        {/* LoggedInRoute requiring route, otherwise Redirects to Login */}
        <LoggedInRoute exact path={ClientRoutes.PROFILE}>
          <ProfilePage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.RESTAURANT_CREATE}>
          <RestaurantsCreatePage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.PRODUCT_CREATE}>
          <RestaurantsCreatePage />
        </LoggedInRoute>

        <Route exact path={ClientRoutes.CHECKOUT}>
          <WizardPage />
        </Route>
        <Route exact path={ClientRoutes.ORDERS_LIST}>
          <RestaurantOrders />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
